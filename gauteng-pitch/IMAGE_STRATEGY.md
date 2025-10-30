# Image Integration Strategy for UAEI Presentation

## Theme Requirements
- **Primary:** African agriculture, organic farming, sustainability, technology
- **Color Theme:** Green (#4CAF50)
- **Context:** Upliftment of African people, modern farming technology
- **Format:** 16:9 landscape (1920×1080 preferred)

## Image Usage Strategy

### Background Images (Subtle, Low Opacity)
- Use as full-screen backgrounds with dark overlay
- Opacity: 10-20% for subtle depth
- Must not interfere with text readability

### Hero Images (Prominent, Integrated)
- Split-screen designs (50/50 or 60/40)
- Corner accents or side panels
- Maintain focus on content

### Accent Images (Small, Supportive)
- Icons or small visuals in cards
- Supporting elements that reinforce message

---

## Slide-by-Slide Image Plan (19 Slides)

### Slide 1: Title Slide
**Image Type:** Hero Background (subtle)
**Search Terms:** "African farmer technology smartphone", "sustainable farming Africa green"
**Implementation:** Full-screen background at 15% opacity with dark gradient overlay
**API:** Pexels (best for African representation)

---

### Slide 2: The Crisis
**Image Type:** Background (dramatic, low opacity)
**Search Terms:** "drought Africa farming", "African farmer drought", "failed crops"
**Implementation:** Dark dramatic background at 12% opacity
**API:** Pexels

---

### Slide 3: The Failure Cycle
**Image Type:** Background (broken systems)
**Search Terms:** "broken agriculture equipment", "failed farming"
**Implementation:** Subtle background at 10% opacity with red tint overlay
**API:** Pixabay

---

### Slide 4: UAEI Innovation
**Image Type:** Split-screen Hero (prominent)
**Search Terms:** "African farmer smartphone technology", "digital agriculture Africa", "farmer using tablet"
**Implementation:** Right-side hero image (40% width) showing African farmer with tech
**API:** Pexels (priority), Unsplash (backup)

---

### Slide 5: Why Farmers Actually Adopt
**Image Type:** Background (community learning)
**Search Terms:** "African farmers group learning", "farmer training Africa"
**Implementation:** Subtle background at 15% opacity
**API:** Pexels

---

### Slide 6: R250k Loan Package
**Image Type:** Split-screen Hero
**Search Terms:** "thriving African farm green fields", "successful organic farming Africa"
**Implementation:** Left-side hero image (40% width) showing vibrant green farmland
**API:** Unsplash, Pexels

---

### Slide 7: What Gauteng Is Funding
**Image Type:** Background (technology focus)
**Search Terms:** "agriculture technology IoT sensors", "drone agriculture", "precision farming"
**Implementation:** Tech-focused background at 12% opacity
**API:** Unsplash

---

### Slide 8: Budget Breakdown
**Image Type:** Subtle Background
**Search Terms:** "green agricultural field from above", "farmland aerial view"
**Implementation:** Aerial green field at 8% opacity (minimal distraction)
**API:** Unsplash

---

### Slide 9: 24-Month Roadmap
**Image Type:** Background (growth progression)
**Search Terms:** "plant growth stages", "seedling to harvest", "agricultural timeline"
**Implementation:** Subtle growth imagery at 10% opacity
**API:** Pixabay

---

### Slide 10: What Gets Validated
**Image Type:** Background (testing/science)
**Search Terms:** "agricultural research", "farm testing", "soil testing Africa"
**Implementation:** Science/validation background at 10% opacity
**API:** Pexels

---

### Slide 11: Platform Architecture
**Image Type:** Split-screen or Background
**Search Terms:** "technology network green", "digital infrastructure", "IoT agriculture"
**Implementation:** Tech network visual on right side (30% width) or subtle background
**API:** Unsplash

---

### Slide 12: Revenue Streams
**Image Type:** Background (abundance/harvest)
**Search Terms:** "abundant harvest Africa", "agricultural marketplace", "farm produce"
**Implementation:** Harvest/marketplace background at 12% opacity
**API:** Pexels, Unsplash

---

### Slide 13: Impact at Scale
**Image Type:** Hero Background (expansive)
**Search Terms:** "large scale African farming", "massive green farmland", "agricultural landscape Africa"
**Implementation:** Dramatic wide farmland background at 18% opacity
**API:** Unsplash (best for landscapes)

---

### Slide 14: Risk Management
**Image Type:** Background (protection/security)
**Search Terms:** "protected crops", "farm insurance", "agricultural safety"
**Implementation:** Protective imagery at 10% opacity
**API:** Pixabay

---

### Slide 15: Why Gauteng
**Image Type:** Background (Gauteng region)
**Search Terms:** "Gauteng South Africa landscape", "Johannesburg agriculture", "South Africa farmland"
**Implementation:** Gauteng-specific background at 15% opacity
**API:** Unsplash, Pexels

---

### Slide 16: Why Now
**Image Type:** Background (urgency/opportunity)
**Search Terms:** "sunrise African farm", "golden hour agriculture", "new beginning farming"
**Implementation:** Sunrise/opportunity imagery at 15% opacity
**API:** Unsplash

---

### Slide 17: Success Criteria
**Image Type:** Background (achievement)
**Search Terms:** "successful African farmer", "thriving farm Africa", "agricultural success"
**Implementation:** Success/achievement background at 15% opacity
**API:** Pexels

---

### Slide 18: The Ask
**Image Type:** Split-screen Hero
**Search Terms:** "business handshake partnership", "agricultural partnership Africa", "farmer handshake"
**Implementation:** Right-side partnership image (35% width)
**API:** Pexels, Unsplash

---

### Slide 19: Thank You
**Image Type:** Background (community celebration)
**Search Terms:** "African farming community", "happy farmers Africa", "agricultural celebration"
**Implementation:** Warm community background at 20% opacity
**API:** Pexels

---

## Technical Implementation

### CSS Pattern for Background Images:
```css
.slide-X {
    background-image: url('images/slide-X-bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
}

.slide-X::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg,
        rgba(0, 0, 0, 0.85) 0%,
        rgba(0, 0, 0, 0.75) 50%,
        rgba(0, 0, 0, 0.80) 100%);
    z-index: 0;
}

.slide-X > * {
    position: relative;
    z-index: 1;
}
```

### CSS Pattern for Split-screen Hero:
```css
.slide-X .content-wrapper {
    display: grid;
    grid-template-columns: 60% 40%;
    gap: 4vw;
    align-items: center;
}

.slide-X .hero-image {
    width: 100%;
    height: 80vh;
    object-fit: cover;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(76, 175, 80, 0.3);
}
```

---

## API Usage Priority

1. **Pexels** - Best for African representation and diversity
2. **Unsplash** - Best for high-quality landscapes and professional shots
3. **Pixabay** - Good for technology and abstract concepts

## Image Requirements

- **Resolution:** Minimum 1920×1080 (16:9)
- **Orientation:** Landscape only
- **Color:** Preference for green tones or images that complement #4CAF50
- **Subject:** African people and contexts whenever possible
- **Quality:** High-resolution, professional photography

---

## Next Steps

1. Fetch images using API keys
2. Download to `/gauteng-pitch/images/` folder
3. Optimize file sizes (compress to ~200-500KB per image)
4. Implement CSS for each slide
5. Test on 16:9 landscape display
6. Adjust opacity/overlays for readability
