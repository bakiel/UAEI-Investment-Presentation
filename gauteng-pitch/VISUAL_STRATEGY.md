# UAEI Presentation Visual Strategy

## v86: Hybrid Approach - Stock Photos + unDraw Storytelling

### Design Philosophy

**Two-tier visual system:**
1. **Stock Photography** - Realistic, authentic African representation
2. **unDraw Illustrations** - Clear concept communication for storytelling

---

## Stock Photography (19 images, 4.2MB total)

### Purpose
- Authentic African farmer representation
- Documentary/professional feel
- Emotional depth and connection
- Real-world context

### Implementation
- **Background images:** All 19 slides have subtle background photos (10-20% opacity with dark overlays)
- **Hero images:** Slides 4, 6, 18 have prominent split-screen images
- **Sources:** Pexels, Unsplash, Pixabay APIs
- **Format:** JPEG compressed at 70% quality, 1920×1080
- **Total size:** 4.2MB (compressed from original 58MB)

### Stock Photo Inventory

| Slide | Image | Type | Theme |
|-------|-------|------|-------|
| 1 | slide-1-hero.jpg | Background | African farmer with smartphone/technology |
| 2 | slide-2-crisis.jpg | Background | Drought/agricultural crisis |
| 3 | slide-3-failure.jpg | Background | Failed/broken agricultural systems |
| **4** | **slide-4-innovation.jpg** | **Hero (split-screen)** | **African farmer using tablet/digital agriculture** |
| 5 | slide-5-adopt.jpg | Background | Farmer group training/community learning |
| **6** | **slide-6-loan.jpg** | **Hero (split-screen)** | **Thriving green farm/sustainable agriculture** |
| 7 | slide-7-funding.jpg | Background | AgTech IoT/drone technology |
| 8 | slide-8-budget.jpg | Background | Aerial green farmland |
| 9 | slide-9-roadmap.jpg | Background | Plant growth progression |
| 10 | slide-10-validation.jpg | Background | Agricultural research/testing |
| 11 | slide-11-platform.jpg | Background | Technology network/digital infrastructure |
| 12 | slide-12-revenue.jpg | Background | Harvest abundance/marketplace |
| 13 | slide-13-impact.jpg | Background (strong) | Large-scale African farming landscape |
| 14 | slide-14-risk.jpg | Background | Farm protection/security |
| 15 | slide-15-gauteng.jpg | Background | Gauteng/South Africa landscape |
| 16 | slide-16-now.jpg | Background | Sunrise/golden hour farming |
| 17 | slide-17-success.jpg | Background | Successful African farmer |
| **18** | **slide-18-ask.jpg** | **Hero (split-screen)** | **Business partnership/handshake** |
| 19 | slide-19-thankyou.jpg | Background | Farming community celebration |

---

## unDraw Illustrations (4 SVGs, 112KB total)

### Purpose
- Abstract concept visualization
- Clear storytelling moments
- Lightweight and scalable
- Brand-aligned (#4CAF50 green)

### Implementation
- **Storytelling cards:** 100px illustrations in story-card sections
- **Analogy boxes:** 90px illustrations for conceptual explanations
- **Format:** SVG (vector, scalable)
- **Color:** Custom recolored to #4CAF50 (UAEI brand green)
- **Total size:** 112KB

### unDraw Illustration Inventory

| Slide | Illustration | Section | Concept |
|-------|--------------|---------|---------|
| 3 | failure-cycle.svg | Illustration placeholder (center) | AgTech failure/cancellation |
| 4 | innovation-genius.svg | Story card "The Genius" | Lightbulb moment/innovation |
| 6 | breakthrough.svg | Story card "The Breakthrough" | Unlock/success/breakthrough |
| 7 | prototype.svg | Analogy box (Tesla example) | Building/prototyping/iteration |

---

## Technical Details

### Stock Photo CSS Pattern (Background)
```css
.slide:nth-child(X) {
    background-image: url('images/slide-X-name.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
}

.slide:nth-child(X)::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: linear-gradient(135deg,
        rgba(0, 0, 0, 0.88) 0%,
        rgba(0, 0, 0, 0.85) 50%,
        rgba(0, 0, 0, 0.88) 100%);
    z-index: 0;
}

.slide:nth-child(X) > * {
    position: relative;
    z-index: 1;
}
```

### Stock Photo CSS Pattern (Split-Screen Hero)
```css
.slide:nth-child(X) .slide-content {
    display: grid;
    grid-template-columns: 58% 40%;
    gap: 2vw;
    align-items: center;
    height: 100%;
}

.slide:nth-child(X) .hero-image-container {
    height: 70vh;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(76, 175, 80, 0.4);
    border: 2px solid rgba(76, 175, 80, 0.3);
}
```

### unDraw Illustration HTML Pattern
```html
<div class="story-card" style="display: grid; grid-template-columns: 120px 1fr; gap: 2vw;">
    <div style="text-align: center;">
        <img src="illustrations/concept.svg" alt="Concept"
             style="width: 100px; height: auto; opacity: 0.9;">
    </div>
    <div class="story-card-content">
        <h3>Title</h3>
        <p>Explanation...</p>
    </div>
</div>
```

---

## Performance Metrics

| Asset Type | Count | Total Size | Format | Purpose |
|------------|-------|------------|--------|---------|
| Stock Photos | 19 | 4.2MB | JPEG 70% | Backgrounds + Heroes |
| unDraw Illustrations | 4 | 112KB | SVG | Storytelling concepts |
| **Total** | **23** | **~4.3MB** | Mixed | Complete visual system |

### Optimization Achievements
- Original stock photos: 58MB
- Compressed to: 4.2MB
- **Reduction: 92%**
- Page load: ~2-3 seconds on 4G

---

## Color System

### Stock Photos
- Dark overlays: rgba(0, 0, 0, 0.80-0.92)
- Gradient overlays for depth
- Opacity: 10-20% for background visibility

### unDraw Illustrations
- Primary color: **#4CAF50** (UAEI brand green)
- Replaces default purple (#6366F1, #8B5CF6)
- Opacity: 0.9 for subtle integration

---

## Maintenance Guide

### Adding New Stock Photos
1. Search Pexels/Unsplash/Pixabay with "African farmer [keyword]"
2. Download at highest resolution
3. Compress: `magick input.jpg -resize 1920x1080^ -gravity center -extent 1920x1080 -quality 70 output.jpg`
4. Add CSS in `image-integration.css` following patterns above
5. Update HTML `<img>` or background reference

### Adding New unDraw Illustrations
1. Browse https://undraw.co/illustrations
2. Download SVG from CDN: `https://cdn.undraw.co/illustration/[slug].svg`
3. Recolor to #4CAF50:
   ```bash
   sed -i '' 's/#6366F1/#4CAF50/g' illustration.svg
   sed -i '' 's/#8B5CF6/#4CAF50/g' illustration.svg
   ```
4. Save to `illustrations/` directory
5. Add to HTML storytelling sections

---

## Attribution

All images are royalty-free and properly sourced:

- **Pexels:** Free for commercial use, no attribution required
- **Unsplash:** Free for commercial use, no attribution required
- **Pixabay:** Free for commercial use, no attribution required
- **unDraw:** Open-source illustrations, MIT License

---

## Version History

- **v84:** Landscape optimization, illustrations hidden
- **v85:** Stock photography integration (19 photos, 4.2MB)
- **v86:** Hybrid approach with unDraw storytelling (4 illustrations, 112KB)

**Current approach:** Best of both worlds - authentic photography + clear concept communication.
