import base64
import re

# Read the file
with open("/mnt/c/Users/rymam/OneDrive/Desktop/content hub/ry-content-hub.html", "r", encoding="utf-8", errors="ignore") as f:
    lines = f.readlines()

# Line 258 contains TOEFL_B64 (0-indexed: 257)
toefl_line = lines[257]
match = re.search(r"var TOEFL_B64\s*=\s*['\"](.+?)['\"]\s*;?\s*$", toefl_line)
if match:
    toefl_b64 = match.group(1)
    toefl_html = base64.b64decode(toefl_b64)
    with open("/mnt/c/Users/rymam/my-site/apps/toefl.html", "wb") as f:
        f.write(toefl_html)
    print(f"TOEFL extracted: {len(toefl_html)} bytes")
else:
    print("TOEFL pattern not found, line length:", len(toefl_line))

# Line 259 contains BOOK2B_B64 (0-indexed: 258)  
book2b_line = lines[258]
match = re.search(r"var BOOK2B_B64\s*=\s*['\"](.+?)['\"]\s*;?\s*$", book2b_line)
if match:
    book2b_b64 = match.group(1)
    book2b_html = base64.b64decode(book2b_b64)
    with open("/mnt/c/Users/rymam/my-site/apps/book2b.html", "wb") as f:
        f.write(book2b_html)
    print(f"Book 2B extracted: {len(book2b_html)} bytes")
else:
    print("Book2B pattern not found, line length:", len(book2b_line))
