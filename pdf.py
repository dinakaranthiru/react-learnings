def create_simple_pdf(filename: str):
    # PDF objects are numbered: 1 0 obj, 2 0 obj, etc.

    # 1: Catalog object
    obj1 = b"""1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
"""

    # 2: Pages object
    obj2 = b"""2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
"""

    # 3: Single Page object
    # /MediaBox [0 0 595 842] ~ A4 size in points (width x height)
    obj3 = b"""3 0 obj
<< /Type /Page
   /Parent 2 0 R
   /MediaBox [0 0 595 842]
   /Contents 4 0 R
   /Resources << /Font << /F1 5 0 R >> >>
>>
endobj
"""

    # 4: Page content stream
    # PDF drawing commands:
    # BT          -> Begin text
    # /F1 24 Tf   -> Use font F1, size 24
    # 100 700 Td  -> Move to (100, 700)
    # (Hello PDF) Tj -> Show text
    # ET          -> End text
    content_stream = b"""BT
/F1 24 Tf
100 700 Td
(Hello PDF) Tj
ET
"""

    # The content must be in a stream object with length
    obj4 = (
        b"4 0 obj\n"
        b"<< /Length " + str(len(content_stream)).encode("ascii") + b" >>\n"
        b"stream\n" +
        content_stream +
        b"\nendstream\n"
        b"endobj\n"
    )

    # 5: Font object (built-in Helvetica)
    obj5 = b"""5 0 obj
<< /Type /Font
   /Subtype /Type1
   /BaseFont /Helvetica
>>
endobj
"""

    # Build the full PDF file
    # We must track byte offsets of each object for the xref table.

    # PDF header
    pdf = b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n"

    # Keep offsets
    offsets = []

    def add_obj(obj_bytes: bytes):
        nonlocal pdf
        offsets.append(len(pdf))
        pdf += obj_bytes

    add_obj(obj1)
    add_obj(obj2)
    add_obj(obj3)
    add_obj(obj4)
    add_obj(obj5)

    # xref table start offset
    xref_offset = len(pdf)

    # xref table: one entry per object + object 0 (free)
    # Each line: 10-digit offset, 5-digit gen, ' n ' or ' f '
    xref = b"xref\n0 6\n"
    xref += b"0000000000 65535 f \n"  # object 0 (free)

    for off in offsets:
        xref += f"{off:010d} 00000 n \n".encode("ascii")

    # Trailer
    trailer = b"""trailer
<< /Size 6
   /Root 1 0 R
>>
startxref
""" + str(xref_offset).encode("ascii") + b"""
%%EOF
"""

    pdf += xref + trailer

    # Write to file
    with open(filename, "wb") as f:
        f.write(pdf)


if __name__ == "__main__":
    create_simple_pdf("output.pdf")