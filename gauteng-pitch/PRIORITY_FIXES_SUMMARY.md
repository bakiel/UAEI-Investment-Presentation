# PRIORITY FIXES SUMMARY - 16:9 Aspect Ratio

## QUICK OVERVIEW

**Total Slides:** 31
**Problem Slides:** 15 (48%)
- **Critical Overflow (Must Fix):** 7 slides
- **Tight Fit (Should Fix):** 8 slides
- **Fits Properly:** 16 slides

---

## PRIORITY 1: CRITICAL FIXES (7 Slides)

### **Slide 8: Budget Breakdown**
**Problem:** 6 vertical budget bars overflow viewport
**Fix:** Reduce gap to 0.7vh, bar height to 18px fixed, shrink fonts
**Time:** 30 min

### **Slide 9: 24-Month Roadmap**
**Problem:** 3 phase cards with 5-6 list items each = overflow
**Fix:** Reduce list items to 4 per card, shrink fonts to 0.6rem
**Time:** 20 min

### **Slide 12: Revenue Streams**
**Problem:** 6 cards in 3×2 grid + illustration + total box = overflow
**Fix:** Reduce to 2×2 grid (4 cards) OR shrink padding significantly
**Time:** 30 min

### **Slide 19: Budget Overview Part 1**
**Problem:** 3 detailed budget categories stacked = overflow
**Fix:** Shorten text descriptions, reduce padding to 1vh 1.2vw
**Time:** 20 min

### **Slide 20: Budget Overview Part 2**
**Problem:** 3 tech boxes with long descriptions = overflow
**Fix:** Shorten Mac Studio/drone specs, reduce padding
**Time:** 20 min

### **Slide 22: Timeline & Milestones**
**Problem:** Same as Slide 9 - too many list items
**Fix:** Reduce to 4 items per phase, shrink fonts
**Time:** 20 min

### **Slide 25: Farmer Journey**
**Problem:** Full-height image + 2 text boxes = overflow
**Fix:** Limit image to 75vh, reduce text box padding
**Time:** 15 min

---

## PRIORITY 2: TIGHT FITS (8 Slides)

### **Slide 2: The Crisis**
**Fix:** Reduce crisis-number-huge to clamp(2.5rem, 5vw, 4rem), reduce gaps

### **Slide 4: UAEI Innovation**
**Fix:** Reduce platform-grid gap to 1vw, padding to 1vh 1vw

### **Slide 6: R250k Loan Package**
**Fix:** Reduce loan-item padding to 1vh 1vw, shrink amounts

### **Slide 11: Platform Architecture**
**Fix:** Reduce tech-layer padding to 1.5vh 1.5vw, shrink gaps

### **Slide 17: Success Criteria**
**Fix:** Reduce success-card padding to 1vh 1vw, shrink fonts

### **Slide 18: The Ask**
**Fix:** Reduce deliverable/timeline padding, shrink amount box

### **Slides 26-27, 29-30: Visual Stories**
**Fix:** Apply universal image height constraint (75vh)

---

## GLOBAL CSS FIXES (Add to styles.css)

```css
/* ============================================
   v85 - 16:9 OVERFLOW FIXES
   ============================================ */

/* 1. Universal Slide Padding */
.slide {
    padding: clamp(1.5vh, 2vh, 2.5vh) clamp(2.5vw, 3vw, 3.5vw) clamp(7vh, 8vh, 9vh) clamp(2.5vw, 3vw, 3.5vw) !important;
    overflow: hidden !important;
    max-height: 100vh !important;
}

/* 2. Heading Sizes */
.slide h2 {
    font-size: clamp(1.4rem, 2.6vw, 2rem) !important;
    margin-bottom: clamp(1vh, 1.2vh, 1.5vh) !important;
}

.slide h3 {
    font-size: clamp(1rem, 1.8vw, 1.3rem) !important;
    margin-bottom: clamp(0.8vh, 1vh, 1.2vh) !important;
}

/* 3. Grid Gaps */
.stats-grid,
.platform-grid,
.validation-grid,
.revenue-grid,
.success-grid,
.risk-grid {
    gap: clamp(1vh, 1.2vh, 1.5vh) clamp(1.2vw, 1.5vw, 2vw) !important;
}

/* 4. Card Padding */
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

/* 5. List Items */
.phase-milestones li,
.validation-card ul li,
ul[style*="line-height"] li {
    font-size: clamp(0.65rem, 1.1vw, 0.8rem) !important;
    line-height: 1.3 !important;
    margin-bottom: 0.3vh !important;
}

/* 6. Visual Story Images */
.slide img[src^="images/"] {
    max-height: 75vh !important;
    width: 100% !important;
    object-fit: cover !important;
}

/* 7. Budget Breakdown (Slide 8) */
.budget-visual {
    gap: 0.7vh !important;
    margin: 1vh auto !important;
}

.budget-bar {
    height: 18px !important;
}

.budget-category,
.budget-amount {
    font-size: clamp(0.7rem, 1.2vw, 0.85rem) !important;
}

.budget-percent {
    font-size: clamp(0.65rem, 1.1vw, 0.8rem) !important;
}

.budget-footer {
    padding: 0.8vh 1.5vw !important;
    margin-top: 1vh !important;
    font-size: clamp(0.7rem, 1.2vw, 0.85rem) !important;
}

/* 8. Timeline Phases (Slides 9, 22) */
.timeline-phases {
    gap: clamp(1.5vh, 2vh, 2.5vh) clamp(1.5vw, 2vw, 2.5vw) !important;
    margin: 1vh auto !important;
}

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
}

/* 9. Revenue Grid (Slide 12) */
.revenue-grid {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: clamp(1vh, 1.2vh, 1.5vh) clamp(1.2vw, 1.5vw, 2vw) !important;
    margin: 1vh auto !important;
}

.revenue-card {
    padding: clamp(1vh, 1.2vh, 1.5vh) clamp(1vw, 1.2vw, 1.5vw) !important;
}

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

/* 10. Success Grid (Slide 17) */
.success-grid {
    gap: clamp(1vh, 1.2vh, 1.5vh) clamp(1.2vw, 1.5vw, 2vw) !important;
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

/* 11. Platform Grid (Slide 4) */
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

/* 12. Tech Stack (Slide 11) */
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

/* 13. Crisis Stat (Slide 2) */
.crisis-number-huge {
    font-size: clamp(2.5rem, 5vw, 4rem) !important;
}

.failure-flow {
    gap: 1.5vw !important;
    margin: 1.5vh 0 !important;
}

/* 14. Story Cards */
.story-card {
    padding: clamp(1.5vh, 2vh, 2.5vh) clamp(1.5vw, 2vw, 2.5vw) !important;
    max-width: 850px !important;
    margin: 1.5vh auto !important;
}

/* 15. Impact Metrics (Slide 13) */
.impact-row {
    gap: clamp(1.5vw, 2vw, 2.5vw) !important;
    margin-bottom: clamp(1.5vh, 2vh, 2.5vh) !important;
}

.impact-metric {
    padding: clamp(1vh, 1.2vh, 1.5vh) clamp(1vw, 1.2vw, 1.5vw) !important;
}
```

---

## HTML CONTENT REDUCTIONS

### **Slide 9: Roadmap (Lines 435-473)**
```html
<!-- Phase 1: Remove "Onboarding protocols documented" -->
<ul class="phase-milestones">
    <li><i class="fas fa-check-circle"></i> Recruit 8-person team</li>
    <li><i class="fas fa-check-circle"></i> Procure vehicles + equipment</li>
    <li><i class="fas fa-check-circle"></i> Platform development kickoff</li>
    <li><i class="fas fa-check-circle"></i> Deploy 4 drones + 10 test IoT</li>
</ul>

<!-- Phase 2: Remove "Benchmark costs (actual vs projected)" -->
<ul class="phase-milestones">
    <li><i class="fas fa-check-circle"></i> Recruit 20-50 pilot farmers</li>
    <li><i class="fas fa-check-circle"></i> Deploy 50 IoT kits total</li>
    <li><i class="fas fa-check-circle"></i> Measure 80%+ app adoption</li>
    <li><i class="fas fa-check-circle"></i> Train credit model (350 variables)</li>
</ul>
```

### **Slide 19: Budget Part 1 (Lines 1064-1084)**
```html
<!-- Shorten descriptions -->
<p style="font-size: clamp(0.7rem, 1.2vw, 0.9rem); line-height: 1.4; margin: 0; color: #999;">
    Ops Director (R30k/mo), Data Lead (R24k/mo), 6 Coordinators (R9k/mo) managing pilot over 24 months
</p>

<p style="font-size: clamp(0.7rem, 1.2vw, 0.9rem); line-height: 1.4; margin: 0; color: #999;">
    R510k/vehicle + fuel R1,340/mo. Business continuity coverage.
</p>

<p style="font-size: clamp(0.7rem, 1.2vw, 0.9rem); line-height: 1.4; margin: 0; color: #999;">
    AgriFresh + FarmIQ platforms, tablets, smartphones, IoT sensors, weather stations
</p>
```

### **Slide 20: Budget Part 2 (Lines 1101-1121)**
```html
<!-- Shorten AI Development -->
<p style="font-size: clamp(0.75rem, 1.3vw, 0.95rem); line-height: 1.5; margin: 0; color: #999;">
    Mac Studio M3 Ultra (R222k) + MacBook Pro M4 Max (R137k). Target: 82% credit accuracy. Saves R449k vs cloud.
</p>

<!-- Shorten Drones -->
<p style="font-size: clamp(0.75rem, 1.3vw, 0.95rem); line-height: 1.5; margin: 0; color: #999;">
    2× DJI Mavic 3 Enterprise (R165k each) + 2× DJI Agras T40 (R125k each). Weekly aerial surveillance.
</p>

<!-- Shorten Connectivity -->
<p style="font-size: clamp(0.75rem, 1.3vw, 0.95rem); line-height: 1.5; margin: 0; color: #999;">
    13 Business LTE SIMs @ R350/month × 24 months. Real-time sensor data transmission from pilot farms.
</p>
```

### **Slide 22: Timeline (Lines 1181-1218)**
```html
<!-- Same reductions as Slide 9 -->
<!-- Phase 1: 4 items -->
<!-- Phase 2: 4 items -->
<!-- Phase 3: Keep 6 items -->
```

---

## IMPLEMENTATION STEPS

1. **Backup Files:**
   ```bash
   cp styles.css styles.css.backup
   cp index.html index.html.backup
   ```

2. **Add Global CSS:**
   - Open `styles.css`
   - Scroll to end (line 6700+)
   - Paste entire CSS block above
   - Save

3. **Edit HTML Content:**
   - Open `index.html`
   - Find each slide by line number
   - Make text reductions
   - Save

4. **Test in Browser:**
   - Open `index.html` in Chrome/Firefox
   - Navigate through all 31 slides
   - Check for vertical scrollbar (should be NONE)
   - Test at 90%, 100%, 110% zoom

5. **Verify Priority Slides:**
   - Slide 8: Budget bars fit
   - Slide 9: Timeline fits
   - Slide 12: Revenue cards fit
   - Slide 19-20: Budget text fits
   - Slide 22: Timeline fits
   - Slide 25: Image + text fit

---

## TESTING CHECKLIST

After fixes:
- [ ] Slide 8 fits without scrolling
- [ ] Slide 9 fits without scrolling
- [ ] Slide 12 fits without scrolling
- [ ] Slide 19 fits without scrolling
- [ ] Slide 20 fits without scrolling
- [ ] Slide 22 fits without scrolling
- [ ] Slide 25 fits without scrolling
- [ ] All 31 slides tested at 100% zoom
- [ ] Navigation buttons always visible
- [ ] Slide counter always visible
- [ ] Fullscreen mode works (F key)
- [ ] Modal pop-ups still work
- [ ] Hover effects still work

---

## ESTIMATED TIME

- **CSS additions:** 15 minutes
- **HTML edits:** 30 minutes
- **Testing:** 30 minutes
- **Total:** 1 hour 15 minutes

---

## NEXT STEPS

1. Implement Priority 1 fixes (7 slides)
2. Test thoroughly
3. If successful, implement Priority 2 fixes (8 slides)
4. Final full test of all 31 slides
5. Tag as v85 "16:9 Overflow Fixes Complete"

---

**Last Updated:** October 30, 2025
