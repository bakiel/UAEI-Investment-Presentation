# 16:9 ASPECT RATIO FITTING AUDIT REPORT
## UAEI Gauteng Pitch Presentation - 31 Slides

**Audit Date:** October 30, 2025
**Project:** `/Users/mac/Downloads/Pope Francis Project/UAEI_PRESENTATION_WEB/gauteng-pitch/`
**Files Analyzed:** `index.html` (1742 lines), `styles.css` (6700+ lines)

---

## EXECUTIVE SUMMARY

**Overall Assessment:** The presentation has undergone extensive 16:9 landscape optimization (v84 enforcement), but **15 slides still have overflow or tight-fitting issues** requiring fixes.

**Critical Findings:**
- **8 slides** with definite OVERFLOW (❌)
- **7 slides** that are TIGHT and may break at certain resolutions (⚠️)
- **16 slides** that fit properly (✅)

**Root Causes:**
1. Multiple content items with insufficient gap/margin reduction
2. Grid layouts (3-column, 2-column) not accounting for total vertical space
3. Inline styles overriding global CSS clamp() values
4. Visual story slides (25-30) with large images + content exceeding viewport
5. Budget/timeline slides with many list items causing vertical overflow

---

## SLIDE-BY-SLIDE AUDIT (All 31 Slides)

### **Slide 1: Title Slide**
**Status:** ✅ **FITS**
**Layout:** Two-column hero layout (logo + boxes)
**Issues:** None
**Notes:** Properly uses `clamp()` for all elements. Hero boxes are compact.

---

### **Slide 2: The Crisis**
**Status:** ⚠️ **TIGHT**
**Issues:**
- Crisis stat + failure flow + story card = 3 major vertical sections
- Large `crisis-number-huge` (2-5%) uses `clamp(3rem, 6vw, 5rem)`
- Failure flow has 3 horizontal items with arrows (good)
- Story card at bottom may be cut off at lower resolutions

**Suggested Fixes:**
- Reduce `.crisis-stat-large` top/bottom margins to `1.5vh` (currently 2vh+)
- Reduce `.failure-flow` gap to `1.5vw` from `2vw`
- Limit story card to `max-width: 800px` and reduce padding to `1.5vh 1.5vw`

**CSS Changes:**
```css
/* Line ~6570 - Reduce crisis number size */
.crisis-number-huge {
    font-size: clamp(2.5rem, 5vw, 4rem) !important; /* down from 3rem/6vw/5rem */
}

/* Reduce failure-flow spacing */
.failure-flow {
    gap: 1.5vw !important;
    margin: 1.5vh 0 !important;
}

/* Reduce story card */
.story-card {
    padding: 1.5vh 1.5vw !important;
    max-width: 800px !important;
}
```

---

### **Slide 3: The Failure Cycle**
**Status:** ✅ **FITS**
**Layout:** Centered illustration + 2-column stats + story card
**Issues:** None
**Notes:** Good use of `clamp()` throughout.

---

### **Slide 4: UAEI Innovation**
**Status:** ⚠️ **TIGHT**
**Issues:**
- Two-column layout: content-left + hero-image-container
- Content-left has: h2 + innovation-section + platform-grid (6 items in 3×2) + story card
- Platform grid uses `grid-template-columns: 1fr 1fr 1fr` (line 150-181 in HTML)
- Total vertical content may exceed available height

**Suggested Fixes:**
- Reduce platform-grid gap to `clamp(1vw, 1.5vw, 2vw)`
- Reduce platform-item padding to `1.2vh 1vw`
- Consider 2 rows of 3 items instead of stacking

**HTML/CSS Changes:**
```css
/* Tighten platform grid */
.platform-grid {
    gap: clamp(1vw, 1.5vw, 2vw) !important;
    margin: 1vh 0 !important;
}

.platform-item {
    padding: clamp(1vh, 1.2vh, 1.5vh) clamp(1vw, 1.2vw, 1.5vw) !important;
}

.platform-icon {
    font-size: clamp(1.5rem, 2.5vw, 2rem) !important;
    margin-bottom: 0.5vh !important;
}
```

---

### **Slide 5: Why It Works**
**Status:** ✅ **FITS**
**Layout:** 4-card stats grid (2×2)
**Issues:** None
**Notes:** Clean, compact layout.

---

### **Slide 6: R250k Loan Package**
**Status:** ⚠️ **TIGHT**
**Issues:**
- Two-column: hero-image + content-right
- Content-right has: h2 + loan-breakdown grid (6 items in 2×3) + story card
- 6 loan items × inline styles = high vertical density
- Line 248-290 shows each item has padding + margins

**Suggested Fixes:**
- Reduce loan-breakdown grid gap to `1.2vw` vertically
- Reduce each loan-item padding to `1vh 1.2vw`
- Reduce large amounts (R100k, R30k) font size to `clamp(1.5rem, 3vw, 2.5rem)`

**CSS Changes:**
```css
/* Inline styles at lines 248-290 need override */
.loan-breakdown {
    gap: clamp(1vh, 1.2vh, 1.5vh) clamp(1.2vw, 1.5vw, 2vw) !important;
}

.loan-item {
    padding: clamp(1vh, 1.2vh, 1.5vh) clamp(1vw, 1.2vw, 1.5vw) !important;
}

/* Reduce large numbers */
.loan-item > div:first-child {
    font-size: clamp(1.5rem, 3vw, 2.5rem) !important;
    margin-bottom: 0.5vh !important;
}
```

---

### **Slide 7: The R7.5M Component**
**Status:** ✅ **FITS**
**Layout:** Two-column (stat + explanation) + analogy box
**Issues:** None
**Notes:** Compact, clean layout with good spacing.

---

### **Slide 8: Budget Breakdown** 🔥 **PRIORITY SLIDE**
**Status:** ❌ **OVERFLOWS**
**Issues:**
- 6 budget bar items stacked vertically (lines 350-414)
- Each item has: header + bar + percentage
- Budget-footer at bottom
- Total height exceeds viewport at 16:9

**Suggested Fixes:**
1. **Reduce budget-bar-item gap** to `0.8vh` (currently 1.2vh in CSS line 5025)
2. **Reduce budget-bar height** to `18px` max (currently clamp(18px, 2.2vh, 25px))
3. **Reduce budget-bar-header font sizes** to `clamp(0.7rem, 1.2vw, 0.85rem)`
4. **Consider horizontal scrolling OR splitting into 2 columns** for 6 items

**CSS Changes:**
```css
/* Line ~5024-5037 - Tighten budget visual */
.budget-visual {
    gap: 0.7vh !important;
    margin: 1vh auto !important;
}

.budget-bar-item {
    margin-bottom: 0.5vh !important;
}

.budget-bar {
    height: 18px !important; /* fixed height */
}

.budget-bar-header {
    margin-bottom: 0.3vh !important;
}

.budget-category,
.budget-amount {
    font-size: clamp(0.7rem, 1.2vw, 0.85rem) !important;
}

.budget-percent {
    font-size: clamp(0.65rem, 1.1vw, 0.8rem) !important;
    margin-top: 0.2vh !important;
}

.budget-footer {
    padding: 0.8vh 1.5vw !important;
    margin-top: 1vh !important;
    font-size: clamp(0.7rem, 1.2vw, 0.85rem) !important;
}
```

**Alternative Fix (HTML restructuring):**
```html
<!-- Split into 2 columns of 3 items each -->
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2vw;">
    <div class="budget-column">
        <!-- Items 1-3 -->
    </div>
    <div class="budget-column">
        <!-- Items 4-6 -->
    </div>
</div>
```

---

### **Slide 9: 24-Month Roadmap** 🔥 **PRIORITY SLIDE**
**Status:** ❌ **OVERFLOWS**
**Issues:**
- 3 phase cards in horizontal grid (good approach)
- Each phase card has: header + timeline + budget + 5-6 list items
- List items use `clamp(0.75rem, 1.3vw, 0.95rem)` (line 5596)
- Total list height causes overflow

**Suggested Fixes:**
1. **Reduce phase-milestones font size** to `clamp(0.65rem, 1.1vw, 0.8rem)`
2. **Reduce li margin-bottom** to `0.3vh`
3. **Reduce phase-card padding** to `1.2vh 1vw`
4. **Reduce number of list items** (remove 1-2 per card if possible)

**CSS Changes:**
```css
/* Line ~5595-5598 - Tighten timeline phases */
.phase-card {
    padding: clamp(1vh, 1.2vh, 1.5vh) clamp(0.8vw, 1vw, 1.2vw) !important;
}

.phase-milestones {
    margin: 0.5vh 0 0 0 !important;
    padding-left: 1vw !important;
}

.phase-milestones li {
    margin-bottom: 0.3vh !important;
    font-size: clamp(0.6rem, 1vw, 0.75rem) !important;
    line-height: 1.3 !important;
}

.phase-timeline,
.phase-budget {
    font-size: clamp(0.7rem, 1.2vw, 0.85rem) !important;
    margin: 0.3vh 0 !important;
}
```

**HTML Change (reduce list items):**
```html
<!-- Phase 1: Remove "Onboarding protocols documented" -->
<!-- Phase 2: Remove "Benchmark costs (actual vs projected)" -->
<!-- Phase 3: Keep all items (critical) -->
```

---

### **Slide 10: What Gets Validated**
**Status:** ✅ **FITS**
**Layout:** 4 validation cards (2×2 grid)
**Issues:** None
**Notes:** Validation-footer is compact.

---

### **Slide 11: Platform Architecture**
**Status:** ⚠️ **TIGHT**
**Issues:**
- Illustration placeholder (500px max-width)
- 4 tech-layer stacked cards (lines 545-596)
- Each layer has 2-3 column grid inside
- Might overflow at lower zoom levels

**Suggested Fixes:**
- Reduce illustration max-width to `400px`
- Reduce tech-layer padding to `1.5vh 1.5vw`
- Reduce tech-layer gap to `1.5vh`
- Reduce inner grid font sizes

**CSS Changes:**
```css
/* Tighten tech stack */
.tech-stack {
    max-width: 1000px !important;
    margin: 1vh auto !important;
}

.tech-layer {
    padding: clamp(1.2vh, 1.5vh, 2vh) clamp(1.5vw, 2vw, 2.5vw) !important;
    margin-bottom: clamp(1vh, 1.2vh, 1.5vh) !important;
}

.tech-layer h3 {
    font-size: clamp(1rem, 1.8vw, 1.3rem) !important;
    margin-bottom: 0.8vh !important;
}

.tech-layer > div {
    gap: 1.2vw !important;
}
```

---

### **Slide 12: Revenue Streams** 🔥 **PRIORITY SLIDE**
**Status:** ❌ **OVERFLOWS**
**Issues:**
- Illustration placeholder (450px)
- 6 revenue cards in 3-column grid (lines 608-656)
- Total-revenue box at bottom
- Cards have percentages + revenue amounts + descriptions
- 3 rows of cards = high vertical density

**Suggested Fixes:**
1. **Reduce illustration to 350px max-width**
2. **Reduce revenue-card padding** to `1vh 1vw`
3. **Reduce revenue-card font sizes**
4. **Reduce grid gap** to `1.2vw`
5. **Consider 2 rows of 3 cards** (remove Bio-Inputs or Training card)

**CSS Changes:**
```css
/* Tighten revenue grid */
.revenue-grid {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: clamp(1vh, 1.2vh, 1.5vh) clamp(1.2vw, 1.5vw, 2vw) !important;
    max-width: 1000px !important;
    margin: 1vh auto !important;
}

.revenue-card {
    padding: clamp(1vh, 1.2vh, 1.5vh) clamp(1vw, 1.2vw, 1.5vw) !important;
}

/* Reduce revenue card numbers */
.revenue-card > div:first-child {
    font-size: clamp(1.4rem, 2.5vw, 2rem) !important;
    margin-bottom: 0.3vh !important;
}

.revenue-card h4 {
    font-size: clamp(0.9rem, 1.5vw, 1.1rem) !important;
    margin-bottom: 0.5vh !important;
}

.revenue-card p {
    font-size: clamp(0.7rem, 1.2vw, 0.85rem) !important;
}

/* Reduce total revenue box */
.total-revenue {
    padding: clamp(1.2vh, 1.5vh, 2vh) clamp(1.5vw, 2vw, 2.5vw) !important;
    margin-top: 1.5vh !important;
}
```

---

### **Slide 13: Full Project Impact**
**Status:** ✅ **FITS**
**Layout:** 2 rows of impact metrics (5 + 4 items)
**Issues:** None
**Notes:** Horizontal layout works well.

---

### **Slide 14: Risk Management**
**Status:** ✅ **FITS**
**Layout:** Illustration + 4 risk items (2×2 grid)
**Issues:** None
**Notes:** Story card at bottom is compact.

---

### **Slide 15: Why Partner With Us**
**Status:** ✅ **FITS**
**Layout:** 4 why-items in 2×2 grid
**Issues:** None
**Notes:** Clean, simple layout.

---

### **Slide 16: Why Now**
**Status:** ✅ **FITS**
**Layout:** 4 urgency items stacked vertically
**Issues:** None
**Notes:** Items are flex-based, not grid, so height is controlled.

---

### **Slide 17: Success Criteria**
**Status:** ⚠️ **TIGHT**
**Issues:**
- 6 success cards in 3-column grid (lines 872-938)
- Each card has: icon + heading + 3 metric lines
- Bottom summary box
- May overflow at certain zoom levels

**Suggested Fixes:**
- Reduce success-card padding to `1.2vh 1.2vw`
- Reduce success-card gap to `1.2vw`
- Reduce metric text size to `clamp(0.7rem, 1.2vw, 0.85rem)`

**CSS Changes:**
```css
/* Tighten success grid */
.success-grid {
    gap: clamp(1vh, 1.2vh, 1.5vh) clamp(1.2vw, 1.5vw, 2vw) !important;
    max-width: 1000px !important;
    margin: 1vh auto !important;
}

.success-card {
    padding: clamp(1vh, 1.2vh, 1.5vh) clamp(1vw, 1.2vw, 1.5vw) !important;
}

.success-card h3 {
    font-size: clamp(0.9rem, 1.5vw, 1.1rem) !important;
    margin-bottom: 0.5vh !important;
}

.success-card div {
    font-size: clamp(0.7rem, 1.2vw, 0.85rem) !important;
    line-height: 1.3 !important;
}

.success-card p {
    margin-bottom: 0.2vh !important;
}
```

---

### **Slide 18: The Ask**
**Status:** ⚠️ **TIGHT**
**Issues:**
- Large R7.5M amount box at top
- 2-column layout: deliverables (4 items) + timeline (3 phases)
- Quote box at bottom
- Deliverables list may cause overflow

**Suggested Fixes:**
- Reduce amount box padding to `1.5vh 2vw`
- Reduce deliverable items padding to `0.8vh 0.8vw`
- Reduce timeline phase boxes padding to `1vh 1vw`

**CSS Changes:**
```css
/* Tighten "The Ask" layout */
.slide h1 {
    margin-bottom: clamp(1vh, 1.2vh, 1.5vh) !important;
}

/* Amount box */
div[style*="R7,500,000"] {
    padding: clamp(1.2vh, 1.5vh, 2vh) clamp(1.5vw, 2vw, 2.5vw) !important;
    margin-bottom: clamp(1.2vh, 1.5vh, 2vh) !important;
}

/* Deliverable/timeline grid */
div[style*="grid-template-columns: 1fr 1fr"] {
    gap: clamp(1.5vw, 2vw, 2.5vw) !important;
}

/* Deliverable items */
div[style*="fa-check-circle"] {
    padding: clamp(0.8vh, 1vh, 1.2vh) clamp(0.8vw, 1vw, 1.2vw) !important;
}
```

---

### **Slide 19: Budget Overview Part 1** 🔥 **PRIORITY SLIDE**
**Status:** ❌ **OVERFLOWS**
**Issues:**
- 3 top stat boxes (good)
- 3 detailed budget categories stacked vertically (lines 1058-1085)
- Each category has: header + percentage + description + detailed text
- High vertical density

**Suggested Fixes:**
1. **Reduce stat box padding** to `1.2vh`
2. **Reduce budget category padding** to `1vh 1.2vw`
3. **Reduce font sizes** for descriptions
4. **Consider side-by-side 2-column layout** for 3 categories

**CSS Changes:**
```css
/* Tighten budget overview */
div[style*="repeat(3, 1fr)"] {
    gap: clamp(1.2vw, 1.5vw, 2vw) !important;
    margin-bottom: clamp(1.2vh, 1.5vh, 2vh) !important;
}

/* Stat boxes */
div[style*="R7.5M"],
div[style*="24 Months"],
div[style*="20-50"] {
    padding: clamp(1vh, 1.2vh, 1.5vh) !important;
}

/* Budget category items */
div[style*="fa-users"],
div[style*="fa-truck"],
div[style*="fa-laptop"] {
    padding: clamp(1vh, 1.2vh, 1.5vh) clamp(1.2vw, 1.5vw, 2vw) !important;
}

/* Reduce percentage font */
span[style*="font-weight: 900"] {
    font-size: clamp(1rem, 1.6vw, 1.3rem) !important;
}

/* Reduce description text */
p[style*="line-height: 1.4"] {
    font-size: clamp(0.65rem, 1.1vw, 0.85rem) !important;
    line-height: 1.3 !important;
}
```

**Alternative Fix (2-column layout):**
```html
<!-- Change grid to 2 columns, move 1 item to right -->
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2vw;">
    <div>
        <!-- Core Team + Fleet Operations -->
    </div>
    <div>
        <!-- Digital Infrastructure -->
    </div>
</div>
```

---

### **Slide 20: Budget Overview Part 2** 🔥 **PRIORITY SLIDE**
**Status:** ❌ **OVERFLOWS**
**Issues:**
- 3 technology investment boxes stacked vertically (lines 1095-1122)
- Each box has: icon + percentage + amount + detailed description
- Very detailed text descriptions (Mac Studio specs, drone specs)
- Summary box at bottom
- Exceeds viewport height

**Suggested Fixes:**
1. **Shorten descriptive text** (remove technical specs details)
2. **Reduce padding** to `1.5vh 1.5vw`
3. **Reduce font sizes** throughout
4. **Consider removing summary box** or making it smaller

**CSS Changes:**
```css
/* Tighten technology investments */
div[style*="fa-brain"],
div[style*="fa-helicopter"],
div[style*="fa-signal"] {
    padding: clamp(1.2vh, 1.5vh, 2vh) clamp(1.5vw, 2vw, 2.5vw) !important;
    margin-bottom: 1.2vh !important;
}

/* Reduce tech box text */
div[style*="fa-brain"] p,
div[style*="fa-helicopter"] p,
div[style*="fa-signal"] p {
    font-size: clamp(0.65rem, 1.1vw, 0.85rem) !important;
    line-height: 1.3 !important;
    margin: 0.3vh 0 !important;
}

/* Summary box */
div[style*="Strategic Investment Thesis"] {
    padding: clamp(1.2vh, 1.5vh, 2vh) clamp(1.5vw, 2vw, 2.5vw) !important;
    margin-top: 1.5vh !important;
}
```

**HTML Changes (shorten text):**
```html
<!-- Line 1102 - Shorten Mac Studio description -->
<p>Mac Studio M3 Ultra (R222k) + MacBook Pro M4 Max (R137k). Target: 82% credit accuracy. Saves R449k vs cloud.</p>

<!-- Line 1111 - Shorten drone description -->
<p>2× DJI Mavic 3 Enterprise (R165k each) + 2× DJI Agras T40 (R125k each). Weekly aerial surveillance.</p>
```

---

### **Slide 21: WHY This Investment Matters**
**Status:** ✅ **FITS**
**Layout:** Core problem box + 4 value cards (2×2) + bottom line box
**Issues:** None
**Notes:** Compact 2×2 grid works well.

---

### **Slide 22: Timeline & Milestones** 🔥 **PRIORITY SLIDE**
**Status:** ❌ **OVERFLOWS**
**Issues:**
- 3 phase cards in horizontal grid (lines 1175-1220)
- Each card has: badge + title + 6 list items
- Similar issue to Slide 9
- List items cause vertical overflow

**Suggested Fixes:**
1. **Reduce list items to 4-5 per phase** (remove least critical)
2. **Reduce font sizes** to `clamp(0.65rem, 1.1vw, 0.8rem)`
3. **Reduce card padding** to `1.2vh 1.2vw`

**CSS Changes:**
```css
/* Same as Slide 9 timeline fixes */
/* See Slide 9 CSS changes above */

/* Additional: Reduce badge size */
div[style*="MONTH 0-6"],
div[style*="MONTH 6-18"],
div[style*="MONTH 18-24"] {
    padding: 0.3vh 1vw !important;
    font-size: clamp(0.8rem, 1.4vw, 1rem) !important;
}
```

**HTML Changes:**
```html
<!-- Phase 1: Reduce to 4 items -->
- Infrastructure deployment complete
- 5-10 farmers onboarded & active
- 4-vehicle fleet deployed
- Initial technology testing begins

<!-- Phase 2: Reduce to 5 items -->
- Scale to 15-25 active farmers
- AI credit model training underway
- ≤12% default rate validation
- Drone surveillance operational
- 20% yield improvement target

<!-- Phase 3: Keep 6 items (critical) -->
```

---

### **Slide 23: Key Activities & Operations**
**Status:** ✅ **FITS**
**Layout:** 4 activity cards in 2×2 grid
**Issues:** None
**Notes:** Text-heavy but fits within viewport.

---

### **Slide 24: Risk Mitigation & Value Retention**
**Status:** ✅ **FITS**
**Layout:** 3 scenario cards + mitigation box + bottom line
**Issues:** None
**Notes:** Horizontal 3-column layout is efficient.

---

### **Slide 25: VISUAL STORY - The Farmer Journey** 🔥 **PRIORITY SLIDE**
**Status:** ❌ **OVERFLOWS**
**Issues:**
- Two-column: image (left) + content (right)
- Image is full-width/height within column
- Content has: h2 + 2 large text boxes (Before/After)
- Image + text boxes exceed viewport height at 16:9

**Suggested Fixes:**
1. **Reduce image height** with `max-height: 75vh; object-fit: cover`
2. **Reduce text box padding** to `1.5vh 1.5vw`
3. **Reduce list font sizes** to `clamp(0.8rem, 1.4vw, 1rem)`
4. **Reduce gap between columns** to `3vw`

**CSS Changes:**
```css
/* Visual story slides - universal fixes */
.slide img[src^="images/"] {
    max-height: 75vh !important;
    width: 100% !important;
    object-fit: cover !important;
}

/* Two-column visual story layout */
div[style*="grid-template-columns: 1fr 1fr"] {
    gap: clamp(2.5vw, 3vw, 4vw) !important;
    max-height: 85vh !important;
}

/* Content boxes in visual stories */
div[style*="rgba(76, 175, 80, 0.08)"],
div[style*="rgba(76, 175, 80, 0.2)"] {
    padding: clamp(1.5vh, 2vh, 2.5vh) clamp(1.5vw, 2vw, 2.5vw) !important;
    margin-bottom: 1.2vh !important;
}

/* List items in visual stories */
div[style*="line-height: 1.8"] ul li {
    font-size: clamp(0.8rem, 1.4vw, 1rem) !important;
    line-height: 1.5 !important;
    margin-bottom: 0.3vh !important;
}

/* Reduce h2 in visual stories */
.slide h2[style*="fas fa-"] {
    font-size: clamp(1.6rem, 3vw, 2.4rem) !important;
    margin-bottom: 1.2vh !important;
}
```

---

### **Slide 26: VISUAL STORY - WhatsApp Advantage**
**Status:** ⚠️ **TIGHT**
**Issues:**
- Two-column: content (left) + image (right)
- Content has: h2 + background box with 3 stat items
- Slightly tight but should fit

**Suggested Fixes:**
- Apply universal visual story fixes from Slide 25
- Reduce stat item padding to `1vh 0.6vw`

**CSS Changes:**
```css
/* Apply Slide 25 fixes +  */
/* Stat items in WhatsApp slide */
div[style*="font-size: clamp(1.6rem, 3.2vw, 2.4rem)"] {
    font-size: clamp(1.4rem, 2.8vw, 2rem) !important;
}

div[style*="padding: 1.2vh 0.8vw"] {
    padding: clamp(0.8vh, 1vh, 1.2vh) clamp(0.6vw, 0.8vw, 1vw) !important;
}
```

---

### **Slide 27: VISUAL STORY - AI Credit Scoring**
**Status:** ⚠️ **TIGHT**
**Issues:**
- Two-column: image (left) + content (right)
- Content has: h2 + 2-column stats + list
- Stats are large (85% vs 60-70%)
- Similar to Slide 25 but reversed

**Suggested Fixes:**
- Apply universal visual story fixes from Slide 25
- Reduce stat box font size to `clamp(1.8rem, 3.5vw, 2.8rem)`

**CSS Changes:**
```css
/* Apply Slide 25 fixes + */
/* AI scoring stats */
div[style*="font-size: clamp(2.2rem, 4vw, 3.2rem)"] {
    font-size: clamp(1.8rem, 3.5vw, 2.8rem) !important;
    margin-bottom: 0.5vh !important;
}
```

---

### **Slide 28: VISUAL STORY - Swarm Intelligence**
**Status:** ✅ **FITS**
**Layout:** Two-column: content + image
**Issues:** None
**Notes:** 3-column stat grid + list is compact enough.

---

### **Slide 29: VISUAL STORY - Drone Validation**
**Status:** ⚠️ **TIGHT**
**Issues:**
- Two-column: image + content
- Content has: h2 + 2-column stats + list
- Similar to Slide 27

**Suggested Fixes:**
- Apply universal visual story fixes from Slide 25

---

### **Slide 30: VISUAL STORY - Scale-Up Pathway**
**Status:** ⚠️ **TIGHT**
**Issues:**
- Two-column: content + image
- Content has: h2 + 2 phase boxes + growth arrow + summary
- Phase boxes have detailed lists
- May overflow at certain zoom levels

**Suggested Fixes:**
- Apply universal visual story fixes from Slide 25
- Reduce phase box padding to `1.5vh 1.5vw`
- Reduce list font sizes to `clamp(0.75rem, 1.3vw, 0.95rem)`

**CSS Changes:**
```css
/* Apply Slide 25 fixes + */
/* Phase boxes in scale-up slide */
div[style*="Phase 1: Pilot"],
div[style*="Phase 2: Deployment"] {
    padding: clamp(1.5vh, 2vh, 2.5vh) clamp(1.5vw, 2vw, 2.5vw) !important;
    margin-bottom: 1vh !important;
}

div[style*="Phase 1: Pilot"] ul li,
div[style*="Phase 2: Deployment"] ul li {
    font-size: clamp(0.75rem, 1.3vw, 0.95rem) !important;
    line-height: 1.4 !important;
}
```

---

### **Slide 31: Contact & Thank You**
**Status:** ✅ **FITS**
**Layout:** Two-column: contact info + logo
**Issues:** None
**Notes:** Final slide is properly sized.

---

## SUMMARY OF ISSUES BY SEVERITY

### **❌ CRITICAL OVERFLOW (8 slides):**
1. **Slide 8** - Budget Breakdown (6 vertical items)
2. **Slide 9** - 24-Month Roadmap (timeline with too many list items)
3. **Slide 12** - Revenue Streams (6 cards in 3×2 grid)
4. **Slide 19** - Budget Overview Part 1 (3 detailed vertical boxes)
5. **Slide 20** - Budget Overview Part 2 (3 tech boxes with long text)
6. **Slide 22** - Timeline & Milestones (3 phase cards with 6 items each)
7. **Slide 25** - Visual Story: Farmer Journey (image + 2 text boxes)

### **⚠️ TIGHT FIT (7 slides):**
1. **Slide 2** - The Crisis (3 major sections)
2. **Slide 4** - UAEI Innovation (6-item platform grid)
3. **Slide 6** - R250k Loan Package (6-item grid)
4. **Slide 11** - Platform Architecture (4 stacked tech layers)
5. **Slide 17** - Success Criteria (6-card grid)
6. **Slide 18** - The Ask (detailed deliverables + timeline)
7. **Slide 26** - WhatsApp Advantage (stats + content)
8. **Slide 27** - AI Credit Scoring (large stats)
9. **Slide 29** - Drone Validation (similar layout)
10. **Slide 30** - Scale-Up Pathway (2 phase boxes with lists)

### **✅ FITS PROPERLY (16 slides):**
Slides 1, 3, 5, 7, 10, 13, 14, 15, 16, 21, 23, 24, 28, 31

---

## ROOT CAUSE ANALYSIS

### **1. Multiple Stacked Content Blocks**
**Problem:** Slides with 3+ major vertical sections (heading + grid + list + footer) exceed 100vh.
**Slides Affected:** 2, 4, 6, 8, 9, 12, 19, 20, 22, 25
**Solution:** Reduce gaps between sections to 1-1.5vh, reduce padding to 1-1.5vh 1-1.5vw

### **2. Grid Layouts with Too Many Items**
**Problem:** 3×2 or 2×3 grids (6 items) create 60-70vh of content alone, leaving no room for heading/footer.
**Slides Affected:** 4, 6, 12, 17
**Solution:** Reduce to 2×2 (4 items), OR make 3-column single row, OR reduce card padding significantly

### **3. List Items with High Line Counts**
**Problem:** Timeline/milestone slides with 5-6 list items per card = 25-35vh per card × 3 cards = overflow.
**Slides Affected:** 9, 22
**Solution:** Reduce to 4 items per card, reduce font size to 0.65-0.75rem, reduce line-height to 1.3

### **4. Visual Story Slides with Large Images**
**Problem:** Full-height images (80-90vh) + text boxes (30-40vh) = overflow.
**Slides Affected:** 25, 26, 27, 29, 30
**Solution:** Limit images to `max-height: 75vh`, reduce text box padding, reduce font sizes

### **5. Inline Styles Overriding Global CSS**
**Problem:** Many slides use inline `style=""` attributes that override global `clamp()` values.
**Slides Affected:** 6, 12, 17, 18, 19, 20, 25-30
**Solution:** Add `!important` CSS rules to override inline styles, OR remove inline styles and use classes

### **6. Insufficient Use of `overflow: hidden`**
**Problem:** Some slides allow vertical scrolling instead of forcing content to fit.
**CSS Lines:** 4877, 5305, 6486
**Solution:** Ensure `.slide` has `overflow: hidden !important` and content is constrained

---

## RECOMMENDED FIX PRIORITY

### **Priority 1 (Critical - Must Fix):**
1. **Slide 8** - Budget Breakdown → Split into 2 columns OR reduce to 4 items
2. **Slide 9** - Roadmap → Reduce list items to 4 per card
3. **Slide 12** - Revenue Streams → Reduce to 4 cards (2×2) OR shrink significantly
4. **Slide 19-20** - Budget Overview → Shorten text, reduce padding
5. **Slide 22** - Timeline → Reduce list items to 4 per card
6. **Slide 25** - Farmer Journey → Reduce image height to 75vh

### **Priority 2 (Important - Should Fix):**
1. **Slide 2** - The Crisis → Reduce spacing between sections
2. **Slide 4** - UAEI Innovation → Reduce platform grid padding
3. **Slide 6** - Loan Package → Reduce grid padding/gap
4. **Slide 11** - Platform Architecture → Reduce tech-layer padding
5. **Slide 17** - Success Criteria → Reduce card padding
6. **Slide 18** - The Ask → Reduce deliverable padding

### **Priority 3 (Nice to Have - Monitor):**
1. **Slides 26-30** - Visual Stories → Apply universal image height constraint
2. Test all slides at different zoom levels (90%, 100%, 110%)
3. Test on different screen resolutions (1920×1080, 1366×768)

---

## GLOBAL CSS FIXES TO IMPLEMENT

### **1. Universal Slide Padding Reduction**
```css
/* Add to styles.css at end */
.slide {
    padding: clamp(1.5vh, 2vh, 2.5vh) clamp(2.5vw, 3vw, 3.5vw) clamp(7vh, 8vh, 9vh) clamp(2.5vw, 3vw, 3.5vw) !important;
    overflow: hidden !important;
    overflow-y: hidden !important;
    max-height: 100vh !important;
}
```

### **2. Universal Heading Size Reduction**
```css
.slide h2 {
    font-size: clamp(1.4rem, 2.6vw, 2rem) !important;
    margin-bottom: clamp(1vh, 1.2vh, 1.5vh) !important;
}

.slide h3 {
    font-size: clamp(1rem, 1.8vw, 1.3rem) !important;
    margin-bottom: clamp(0.8vh, 1vh, 1.2vh) !important;
}
```

### **3. Universal Grid Gap Reduction**
```css
.stats-grid,
.platform-grid,
.validation-grid,
.revenue-grid,
.success-grid,
.risk-grid,
.impact-row {
    gap: clamp(1vh, 1.2vh, 1.5vh) clamp(1.2vw, 1.5vw, 2vw) !important;
}
```

### **4. Universal Card Padding Reduction**
```css
.stat-card,
.platform-item,
.validation-card,
.revenue-card,
.success-card,
.risk-item,
.phase-card,
.loan-item {
    padding: clamp(1vh, 1.2vh, 1.5vh) clamp(1vw, 1.2vw, 1.5vw) !important;
}
```

### **5. Universal List Styling**
```css
.phase-milestones li,
.validation-card ul li,
ul[style*="line-height"] li {
    font-size: clamp(0.65rem, 1.1vw, 0.8rem) !important;
    line-height: 1.3 !important;
    margin-bottom: 0.3vh !important;
}
```

### **6. Visual Story Image Constraints**
```css
/* Slides 25-30 */
.slide img[src^="images/"] {
    max-height: 75vh !important;
    width: 100% !important;
    object-fit: cover !important;
}

.slide div[style*="grid-template-columns: 1fr 1fr"] {
    gap: clamp(2.5vw, 3vw, 4vw) !important;
    align-items: start !important;
}
```

---

## TESTING CHECKLIST

After implementing fixes, test:

- [ ] **All 31 slides at 100% zoom** - No vertical scrollbar visible
- [ ] **All 31 slides at 90% zoom** - Content doesn't become too small to read
- [ ] **All 31 slides at 110% zoom** - Content still fits without overflow
- [ ] **Slides 8, 9, 12, 19, 20, 22, 25** - Priority slides fit completely
- [ ] **Navigation buttons** - Always visible and clickable (not covered by content)
- [ ] **Slide counter** - Always visible in bottom-left corner
- [ ] **Fullscreen mode** - All slides fit in true fullscreen (F key)
- [ ] **Modal pop-ups** - Still work after CSS changes
- [ ] **Hover effects** - Cards still lift/glow on hover
- [ ] **Responsive text** - clamp() values work at different viewport sizes

---

## SPECIFIC HTML CHANGES NEEDED

### **Slide 8 (Budget Breakdown) - Remove 1-2 Items**
**Option A:** Combine "Connectivity" into "Digital Infrastructure"
**Option B:** Split into 2 columns

### **Slide 9 (Roadmap) - Reduce List Items**
```html
<!-- Phase 1: Remove "Onboarding protocols documented" -->
<!-- Phase 2: Remove "Benchmark costs (actual vs projected)" -->
```

### **Slide 12 (Revenue Streams) - Consider Removing 1-2 Cards**
**Option A:** Remove "Training" and "B2B Services" (merge into "Marketplace")
**Option B:** Keep all 6 but significantly reduce padding

### **Slide 19 (Budget Part 1) - Shorten Descriptions**
```html
<!-- Core Team: "Ops Director (R30k/mo), Data Lead (R24k/mo), 6 Coordinators (R9k/mo)" -->
<!-- Fleet: "4× Toyota Hilux 2.4 GD-6 4×4. Business continuity coverage." -->
<!-- Digital: "AgriFresh + FarmIQ platforms, IoT sensors, weather stations" -->
```

### **Slide 20 (Budget Part 2) - Shorten Technical Details**
```html
<!-- AI Development: "Mac Studio M3 Ultra (R222k) + MacBook Pro M4 Max (R137k). 82% accuracy target. Saves R449k." -->
<!-- Drones: "2× Mavic 3 Enterprise (R165k) + 2× Agras T40 (R125k). Weekly surveillance." -->
<!-- Connectivity: "13 Business LTE SIMs. Real-time sensor data transmission." -->
```

### **Slide 22 (Timeline) - Reduce List Items**
Same as Slide 9 (timeline slides have same structure)

---

## LONG-TERM RECOMMENDATIONS

1. **Create Slide Templates:** Define 4-5 standard layouts with pre-tested heights
   - Title + 4-card grid (2×2)
   - Title + 2-column content
   - Title + 3-phase timeline
   - Title + stacked cards (max 3)
   - Visual story (image + text box)

2. **Content Guidelines:** Establish rules:
   - Max 4 list items per card
   - Max 3 cards per vertical stack
   - Max 6 cards in grid (prefer 4)
   - Images max 75vh height
   - Headings max 2 lines

3. **Automated Testing:** Create script to check:
   - Slide content height vs viewport height
   - List item counts per card
   - Grid item counts
   - clamp() min/max values

4. **Version Control:** Tag this as v85 with "16:9 Overflow Fixes"

---

## FILES TO MODIFY

1. **styles.css** - Add global fixes at end (lines 6700+)
2. **index.html** - Edit slides 8, 9, 12, 19, 20, 22 to reduce content
3. Test in browser after each change

---

## CONCLUSION

**Current State:** 15 of 31 slides (48%) have overflow or tight-fitting issues.

**After Fixes:** All 31 slides should fit within 16:9 aspect ratio without scrolling.

**Estimated Work:**
- CSS changes: 2 hours
- HTML content reduction: 1 hour
- Testing: 1 hour
- **Total: 4 hours**

**Risk:** Low - Changes are incremental and use existing clamp() patterns.

---

**Audit Completed:** October 30, 2025
**Next Steps:** Implement Priority 1 fixes first, test thoroughly, then move to Priority 2.
