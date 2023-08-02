# min-media-player 1.15

If anyone was trying to use the plugin and it didn't work, 1.14 fixed the bug that was causing it...

[HFS](https://github.com/rejetto/hfs) plugin adding a minimalistic media player

Proper mime types should be defined in HFS, for example:

`config.yaml`

```yaml
mime:
  "*.aac": audio/aac
  "*.apng": image/png
  "*.avif": image/avif
  "*.bmp": image/bmp
  "*.css": text/css
  "*.f4v": video/mp4
  "*.flac": audio/flac
  "*.gif": image/gif
  "*.htm": text/html
  "*.html": text/html
  "*.jfif": image/jpeg
  "*.jpeg": image/jpeg
  "*.jpg": image/jpeg
  "*.js": text/javascript
  "*.log": text/plain
  "*.mka": audio/x-matroska
  "*.mkv": video/webm
  "*.mov": video/quicktime
  "*.mp3": audio/mp3
  "*.mp4": video/mp4
  "*.ogg": audio/ogg
  "*.ogv": video/ogg
  "*.opus": audio/opus
  "*.png": image/png
  "*.svg": image/svg+xml
  "*.txt": text/plain
  "*.wav": audio/wav
  "*.webm": video/webm
  "*.webp": image/webp
```

If you are having problems with playing back H265/HEVC you might need to enable `chrome://flags/#ignore-gpu-blocklist` flag in your chromium based browser  
For Microsoft Edge you need the paid [HEVC Video Extensions](https://www.microsoft.com/store/productId/9NMZLZ57R3T7)

Most of the code borrowed from [rejetto/simple-player](https://github.com/rejetto/simple-player)

---
[HFS](https://github.com/rejetto/hfs) ~  HTTP File Server
