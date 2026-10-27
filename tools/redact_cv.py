"""Remove the phone and date-of-birth items from the CV sidebar and close the gaps.

Usage: python -I redact_cv.py <in.pdf> <out.pdf>
Everything in the sidebar below the removed items is re-drawn shifted up,
so the layout looks like those items were never there.
"""
import sys
import pymupdf

SIDEBAR_X = 205          # sidebar content ends ~170pt, main column starts ~220pt
REMOVE_LABELS = {"TELEFON", "PHONE", "DATA URODZENIA", "DATE OF BIRTH"}
FONTS = {"SegoeUI": r"C:\Windows\Fonts\segoeui.ttf",
         "SegoeUI-Bold": r"C:\Windows\Fonts\segoeuib.ttf",
         "SegoeUI-Semibold": r"C:\Windows\Fonts\seguisb.ttf"}

src, dst = sys.argv[1], sys.argv[2]
doc = pymupdf.open(src)
page = doc[0]

# Sidebar text lines (label or value), top to bottom.
lines = []
for b in page.get_text("rawdict")["blocks"]:
    for l in b.get("lines", []):
        for s in l["spans"]:
            if s["bbox"][0] < SIDEBAR_X and s["chars"]:
                text = "".join(c["c"] for c in s["chars"])
                lines.append({"y": s["bbox"][1], "text": text.strip(), "span": s})
lines.sort(key=lambda d: d["y"])

# Each removed item is its label plus the value line right under it.
removed = []
for i, ln in enumerate(lines):
    if ln["text"] in REMOVE_LABELS:
        removed.append((ln["y"], lines[i + 1]["y"]))
assert len(removed) == 2, f"expected phone and birth date items, got {removed}"
(phone_y, _), (birth_y, _) = removed
top = phone_y - 2

# The next item after each removed one takes its place.
after = sorted(ln["y"] for ln in lines if ln["y"] > phone_y and ln["text"].isupper() and ln["text"] not in REMOVE_LABELS)
pitch = after[0] - phone_y                    # distance between consecutive items
skip = {y for pair in removed for y in pair}


def shift(y):
    # One item height for content between the two removed items, two below both.
    return -pitch if y < birth_y else -2 * pitch


keep = [ln for ln in lines if ln["y"] >= top and ln["y"] not in skip]
paths = [p for p in page.get_drawings() if p["rect"].y0 >= top and p["rect"].x1 <= SIDEBAR_X]
links = [ln for ln in page.get_links() if ln["from"].y0 >= top and ln["from"].x0 < SIDEBAR_X]

# Wipe the sidebar from the phone item down: text and vector art fully inside go,
# the sidebar background (which starts at the top of the page) stays.
page.add_redact_annot(pymupdf.Rect(0, top, SIDEBAR_X, page.rect.y1), fill=False)
page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE,
                      graphics=pymupdf.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED,
                      text=pymupdf.PDF_REDACT_TEXT_REMOVE)
for ln in page.get_links():
    if ln["from"].y0 >= top and ln["from"].x0 < SIDEBAR_X:
        page.delete_link(ln)

# Re-draw the sidebar graphics (divider lines, skill tags) shifted up.
shape = page.new_shape()
for p in paths:
    m = pymupdf.Matrix(1, 0, 0, 1, 0, shift(p["rect"].y0))
    for item in p["items"]:
        kind = item[0]
        if kind == "l":
            shape.draw_line(item[1] * m, item[2] * m)
        elif kind == "re":
            shape.draw_rect(item[1] * m)
        elif kind == "qu":
            shape.draw_quad(item[1] * m)
        elif kind == "c":
            shape.draw_bezier(item[1] * m, item[2] * m, item[3] * m, item[4] * m)
    cap = p.get("lineCap") or (0,)
    shape.finish(fill=p.get("fill"), color=p.get("color"), dashes=p.get("dashes"),
                 even_odd=p.get("even_odd", False), closePath=p.get("closePath", False),
                 lineJoin=p.get("lineJoin") or 0, lineCap=max(cap) if isinstance(cap, (tuple, list)) else cap,
                 width=p.get("width") or 0, stroke_opacity=p.get("stroke_opacity") or 1,
                 fill_opacity=p.get("fill_opacity") or 1)
shape.commit()

# Re-insert the kept text character by character, so letter spacing stays exact.
for i, (name, path) in enumerate(FONTS.items()):
    page.insert_font(fontname=f"cv{i}", fontfile=path)
alias = {name: f"cv{i}" for i, name in enumerate(FONTS)}
for ln in keep:
    s = ln["span"]
    font = s["font"].split("+")[-1]
    rgb = pymupdf.sRGB_to_pdf(s["color"])
    dy = shift(ln["y"])
    for c in s["chars"]:
        if c["c"].strip():
            x, y = c["origin"]
            page.insert_text((x, y + dy), c["c"], fontname=alias[font], fontsize=s["size"], color=rgb)

# Keep the links that belonged to kept lines (e.g. GitHub), shifted with them.
for ln in links:
    if not ln.get("uri", "").startswith("tel:"):
        dy = shift(ln["from"].y0)
        page.insert_link({"kind": pymupdf.LINK_URI, "uri": ln["uri"],
                          "from": ln["from"] * pymupdf.Matrix(1, 0, 0, 1, 0, dy)})

# The deleted phone link stays referenced from the structure tree; blank the object itself.
for xref in range(1, doc.xref_length()):
    if "tel:" in (doc.xref_object(xref) or ""):
        doc.update_object(xref, "null")

doc.subset_fonts()   # keep only the glyphs used, otherwise the Segoe UI files add ~1.5 MB
doc.save(dst, garbage=4, deflate=True, clean=True)
print("saved", dst, "pitch", round(pitch, 2))
