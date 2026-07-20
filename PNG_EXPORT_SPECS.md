# BlazeLogic Logo — PNG Export Specifications

## Export Guide for Creating PNG Files from SVG

This document provides specifications for exporting each SVG logo file to PNG format at various resolutions.

### Tools Recommended

- **Figma** (recommended, free tier available)
- **Illustrator** (professional)
- **Inkscape** (free, open-source)
- **Online converters:** CloudConvert, Convertio, SVG2PNG
- **Command line:** ImageMagick, Cairo, Librsvg

---

## Export Settings

### General PNG Export Settings

**Format:** PNG-24 (24-bit RGB)
**Compression:** Maximum (9 in most tools)
**Background:** Transparent
**Color space:** sRGB
**Antialiasing:** On (smoothing/bicubic)

### For Each SVG File

---

## 1. Logo Icon Only (`logo-icon-only.svg`)

### Standard Web Sizes

| Size | Width | Height | DPI | Use Case |
|------|-------|--------|-----|----------|
| 32px | 32 | 32 | 72 | Small favicon |
| 64px | 64 | 64 | 72 | Favicon, browser icon |
| 128px | 128 | 128 | 72 | Avatar, small app icon |
| 256px | 256 | 256 | 72 | Medium app icon |
| 512px | 512 | 512 | 72 | Large icon, social media |

### Mobile App Sizes (with 2x/3x variants)

**iOS App Icon:**
- 60px (1x - iPhone)
- 120px (2x - iPhone)
- 180px (3x - iPhone)

**Android App Icon:**
- 96px (mdpi)
- 144px (hdpi)
- 192px (xhdpi)
- 288px (xxhdpi)
- 384px (xxxhdpi)

### Print Sizes (300 DPI)

| Size | Width | Height | Physical Size | Use Case |
|------|-------|--------|----------------|----------|
| 1536px | 1536 | 1536 | 5" x 5" | Print icon |
| 2400px | 2400 | 2400 | 8" x 8" | Large print |

### Export Files

```
logo-icon-only-32.png
logo-icon-only-64.png
logo-icon-only-128.png
logo-icon-only-192.png (Android)
logo-icon-only-256.png
logo-icon-only-512.png
logo-icon-only-print-1536.png (300 DPI)
```

---

## 2. App Icon Square (`logo-app-icon-square.svg`)

### Standard Sizes

| Size | Width | Height | Use Case |
|------|-------|--------|----------|
| 192px | 192 | 192 | Android, web manifest |
| 512px | 512 | 512 | iOS, web manifest |

### iOS App Store

| Variant | Size | Format |
|---------|------|--------|
| iPhone | 180x180 | PNG |
| iPad | 167x167 | PNG |
| Mac | 512x512 | PNG |
| Watch | 108x108 | PNG |

### Android Play Store

| Density | Size | Format |
|---------|------|--------|
| mdpi | 96x96 | PNG |
| hdpi | 144x144 | PNG |
| xhdpi | 192x192 | PNG |
| xxhdpi | 288x288 | PNG |
| xxxhdpi | 384x384 | PNG |

### Web Manifest

```json
{
  "icons": [
    {
      "src": "logo-app-icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "logo-app-icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Export Files

```
logo-app-icon-180.png (iOS)
logo-app-icon-192.png (Android/Web)
logo-app-icon-512.png (Large)
```

---

## 3. Primary Horizontal Logo (`logo-primary-horizontal.svg`)

### Web Sizes

| Size | Width | Height | Aspect | Use Case |
|------|-------|--------|--------|----------|
| 512 | 512 | 128 | 4:1 | Small header |
| 1024 | 1024 | 256 | 4:1 | Standard header |
| 2048 | 2048 | 512 | 4:1 | Retina display |

### Social Media

| Platform | Width | Height | Use Case |
|----------|-------|--------|----------|
| LinkedIn | 1200 | 628 | Cover photo |
| Twitter | 1024 | 512 | Header |
| Facebook | 1200 | 628 | Cover photo |
| YouTube | 2560 | 1440 | Channel art |

### Email & Digital

| Use | Width | Height | Notes |
|-----|-------|--------|-------|
| Email signature | 600 | 150 | Typical size |
| Email header | 800 | 200 | Banner |
| Presentation | 1024 | 256 | Slide logo |

### Print Sizes (300 DPI)

| Size | Width | Height | Physical Size | Use Case |
|------|-------|--------|----------------|----------|
| Standard | 1200 | 300 | 4" x 1" | Print material |
| Large | 3072 | 768 | 10.24" x 2.56" | Poster |
| Extra Large | 4800 | 1200 | 16" x 4" | Banner |

### Export Files

```
logo-primary-horizontal-512.png (4:1, web small)
logo-primary-horizontal-1024.png (4:1, web standard)
logo-primary-horizontal-2048.png (4:1, retina)
logo-primary-horizontal-linkedin.png (1200x628)
logo-primary-horizontal-twitter.png (1024x512)
logo-primary-horizontal-print-1200.png (300 DPI, 4"x1")
logo-primary-horizontal-print-3072.png (300 DPI, 10.24"x2.56")
```

---

## 4. Monochrome Light (`logo-monochrome-light.svg`)

### Sizes

Same as Primary Horizontal (800x200px artboard)

| Size | Width | Height | Use |
|------|-------|--------|-----|
| 512 | 512 | 128 | Small |
| 1024 | 1024 | 256 | Standard |
| 2048 | 2048 | 512 | Retina |

### Print (300 DPI)

| Width | Height | Physical | Use |
|-------|--------|----------|-----|
| 1200 | 300 | 4" x 1" | Business card |
| 3072 | 768 | 10.24" x 2.56" | Letterhead |

### Export Files

```
logo-monochrome-light-512.png
logo-monochrome-light-1024.png
logo-monochrome-light-print-1200.png (300 DPI)
```

---

## 5. Monochrome Dark (`logo-monochrome-dark.svg`)

### Sizes

Same as Monochrome Light

| Size | Width | Height | Use |
|------|-------|--------|-----|
| 512 | 512 | 128 | Web small |
| 1024 | 1024 | 256 | Web standard |
| 2048 | 2048 | 512 | Retina/Print preparation |

### Export Files

```
logo-monochrome-dark-512.png
logo-monochrome-dark-1024.png
logo-monochrome-dark-2048.png
```

---

## 6. Stacked Vertical (`logo-stacked-vertical.svg`)

### Web Sizes

| Size | Width | Height | Aspect | Use |
|------|-------|--------|--------|-----|
| 240 | 240 | 360 | 2:3 | Small sidebar |
| 400 | 400 | 600 | 2:3 | Standard vertical |
| 600 | 600 | 900 | 2:3 | Large vertical |

### Mobile & Social

| Platform | Width | Height | Use |
|----------|-------|--------|-----|
| Instagram Story | 1080 | 1920 | Story format |
| TikTok | 1080 | 1920 | Vertical video |

### Print (300 DPI)

| Width | Height | Physical | Use |
|-------|--------|----------|-----|
| 1200 | 1800 | 4" x 6" | Vertical poster |
| 1800 | 2700 | 6" x 9" | Book cover |

### Export Files

```
logo-stacked-vertical-240.png (small)
logo-stacked-vertical-400.png (standard)
logo-stacked-vertical-600.png (large)
logo-stacked-vertical-print-1200.png (300 DPI, 4"x6")
```

---

## Batch Export Process

### Using ImageMagick (Command Line)

```bash
# Icon sizes
convert -density 72 logo-icon-only.svg -resize 32x32 logo-icon-only-32.png
convert -density 72 logo-icon-only.svg -resize 64x64 logo-icon-only-64.png
convert -density 72 logo-icon-only.svg -resize 128x128 logo-icon-only-128.png
convert -density 72 logo-icon-only.svg -resize 256x256 logo-icon-only-256.png
convert -density 72 logo-icon-only.svg -resize 512x512 logo-icon-only-512.png

# Print resolution
convert -density 300 logo-icon-only.svg -resize 1536x1536 logo-icon-only-print-1536.png

# Horizontal logo
convert -density 72 logo-primary-horizontal.svg -resize 512x128 logo-primary-horizontal-512.png
convert -density 72 logo-primary-horizontal.svg -resize 1024x256 logo-primary-horizontal-1024.png
convert -density 72 logo-primary-horizontal.svg -resize 2048x512 logo-primary-horizontal-2048.png

# Print
convert -density 300 logo-primary-horizontal.svg -resize 1200x300 logo-primary-horizontal-print-1200.png
```

### Using Figma

1. Import SVG file
2. Right-click frame/artboard
3. Select "Export" → "Add export setting"
4. Set format: PNG
5. Set scale: 1x, 2x, 3x (as needed)
6. Click "Export" → Choose location
7. Repeat for each size/variant

### Using Inkscape

1. File → Open → Select SVG
2. File → Export As → PNG Image
3. Set "Image size" (width/height in pixels)
4. Set "Resolution" (72 DPI for web, 300 for print)
5. Click "Export"
6. Repeat for each size

---

## Quality Checklist

After exporting PNG files:

✅ File size is reasonable (< 500KB for web sizes)
✅ No compression artifacts visible
✅ Edges are smooth and antialiased
✅ Colors match original SVG
✅ Transparent background is preserved
✅ Text is crisp and readable
✅ Circuit traces are sharp
✅ Metallic gradient is smooth
✅ File dimensions match specification
✅ Color profile is sRGB (for web)

---

## File Naming Convention

All PNG files should follow this naming convention:

```
logo-[VERSION]-[SIZE].png

Examples:
logo-icon-only-32.png
logo-icon-only-512.png
logo-primary-horizontal-1024.png
logo-app-icon-192.png
logo-monochrome-light-512.png
logo-stacked-vertical-400.png
```

---

## Storage & Organization

Recommended folder structure:

```
/blazelogic-brand/
├── SVG/
│   ├── logo-primary-horizontal.svg
│   ├── logo-icon-only.svg
│   ├── logo-app-icon-square.svg
│   ├── logo-monochrome-light.svg
│   ├── logo-monochrome-dark.svg
│   └── logo-stacked-vertical.svg
├── PNG/
│   ├── icon/
│   │   ├── logo-icon-only-32.png
│   │   ├── logo-icon-only-64.png
│   │   └── ... (all sizes)
│   ├── horizontal/
│   │   ├── logo-primary-horizontal-512.png
│   │   ├── logo-primary-horizontal-1024.png
│   │   └── ... (all sizes)
│   ├── app-icon/
│   │   ├── logo-app-icon-192.png
│   │   └── logo-app-icon-512.png
│   ├── print/
│   │   ├── logo-icon-only-print-1536.png
│   │   └── logo-primary-horizontal-print-3072.png
│   └── monochrome/
│       ├── logo-monochrome-light-*.png
│       └── logo-monochrome-dark-*.png
└── LOGO_BRAND_GUIDE.md
```

---

## Summary

**Total files to generate from 6 SVG files:**

- Icon-only: 10-15 PNG variants
- App icon: 8-12 PNG variants
- Primary horizontal: 8-10 PNG variants
- Monochrome light: 4-6 PNG variants
- Monochrome dark: 4-6 PNG variants
- Stacked vertical: 6-8 PNG variants

**Grand total: 40-57 PNG files** (depending on how many sizes you export)

**Recommended minimum set (for immediate use):**
- 32px, 64px, 128px, 192px, 512px icon sizes
- 512px, 1024px horizontal sizes
- 192px, 512px app icon sizes
- Print sizes at 300 DPI

---

**Created:** July 2026  
**Status:** Production Ready ✅

