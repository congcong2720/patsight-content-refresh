from pathlib import Path
import base64
import mimetypes
import re
from urllib.request import urlopen


root = Path(__file__).resolve().parent
dist = root / "dist" / "public"

html = (dist / "index.html").read_text(encoding="utf-8")
css = next((dist / "assets").glob("*.css")).read_text(encoding="utf-8")
js = next((dist / "assets").glob("*.js")).read_text(encoding="utf-8")

# Embed product images so the shared file works offline.
remote_urls = set(
    re.findall(
        r"https://patent\.xinsight-ai\.com/assets/[A-Za-z0-9_.-]+\.(?:png|jpg|jpeg|webp|svg)",
        js,
    )
)
for url in remote_urls:
    with urlopen(url, timeout=30) as response:
        data = response.read()
    mime_type = mimetypes.guess_type(url)[0] or "application/octet-stream"
    data_url = f"data:{mime_type};base64,{base64.b64encode(data).decode('ascii')}"
    js = js.replace(url, data_url)

local_assets = set(re.findall(r"/assets/[A-Za-z0-9_.-]+\.(?:png|jpg|jpeg|webp|svg)", js))
for asset_path in local_assets:
    file_path = dist / asset_path.lstrip("/")
    if not file_path.exists():
        continue
    data = file_path.read_bytes()
    mime_type = mimetypes.guess_type(file_path.name)[0] or "application/octet-stream"
    data_url = f"data:{mime_type};base64,{base64.b64encode(data).decode('ascii')}"
    js = js.replace(asset_path, data_url)

# Avoid terminating the inline elements when bundled source contains HTML examples.
css = re.sub(r"</style", r"<\/style", css, flags=re.IGNORECASE)
js = re.sub(r"</script", r"<\/script", js, flags=re.IGNORECASE)

html = re.sub(
    r'\s*<script id="manus-runtime">.*?</script>',
    "",
    html,
    flags=re.DOTALL,
)
html = re.sub(
    r'<script type="module" crossorigin src="/assets/[^"]+\.js"></script>',
    lambda _: f'<script type="module">{js}</script>',
    html,
)
html = re.sub(
    r'<link rel="stylesheet" crossorigin href="/assets/[^"]+\.css">',
    lambda _: f"<style>{css}</style>",
    html,
)

output = root / "PatSight_首页样稿_可分享.html"
output.write_text(html, encoding="utf-8")
print(output)

# Keep a minimal publication directory for GitHub Pages.
publish_dir = root.parent / "patsight-landing-page-publish"
publish_dir.mkdir(exist_ok=True)
publish_output = publish_dir / "index.html"
publish_output.write_text(html, encoding="utf-8")
(publish_dir / ".nojekyll").touch()
print(publish_output)
