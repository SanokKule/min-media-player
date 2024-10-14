# min-media-player

[HFS](https://github.com/rejetto/hfs) plugin adding a minimalistic media player

Mime types should be defined in HFS.
<details>
<summary>config.yaml mime example</summary>

```yaml
mime:
  "*.apng": image/png
  "*.avif": image/avif
  "*.bmp": image/bmp
  "*.css": text/css
  "*.f4v": video/mp4
  "*.flac": audio/flac
  "*.gif": image/gif
  "*.htm|*.html": text/html
  "*.js": text/javascript
  "*.mka": audio/webm
  "*.mkv|*.webm": video/webm
  "*.mov": video/quicktime
  "*.ogv": video/ogg
  "*.opus": audio/opus
  "*.svg": image/svg+xml
  "*.txt": text/plain
```

</details>

---
If you are having problems with playing back H265/HEVC you might need to enable `chrome://flags/#ignore-gpu-blocklist` flag in your chromium based browser  
For Microsoft Edge you need the paid [HEVC Video Extensions](https://www.microsoft.com/store/productId/9NMZLZ57R3T7)

---
[HFS](https://github.com/rejetto/hfs) ~  HTTP File Server
