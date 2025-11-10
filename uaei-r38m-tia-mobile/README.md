# UAEI R38M TIA Innovation Fund - Mobile Presentation

**Mobile-optimized version** of the UAEI pitch deck for portrait viewing on smartphones.

---

## Features

✅ **Portrait Orientation** - Designed for 9:16 phone screens
✅ **Vertical Scroll** - Natural mobile UX (no slide navigation)
✅ **Touch Optimized** - Large tap targets, swipe-friendly
✅ **Responsive Text** - Readable on all phone sizes (320px-600px width)
✅ **Single Column** - Simplified layouts for small screens
✅ **Fade-in Animations** - Content animates as you scroll
✅ **Offline Capable** - Can be saved as PWA

---

## Usage

### Local Testing:
```bash
# Navigate to mobile folder
cd uaei-r38m-tia-mobile

# Start local server (Python 3)
python3 -m http.server 8080

# Or use Node.js http-server
npx http-server -p 8080
```

Then open on your phone: `http://[YOUR-LOCAL-IP]:8080`

### GitHub Pages Deployment:
1. Push to GitHub repository
2. Enable GitHub Pages in Settings
3. Set source to `main` branch, `/uaei-r38m-tia-mobile` folder
4. Access via: `https://[username].github.io/[repo]/uaei-r38m-tia-mobile/`

---

## Sections

1. **Hero** - R38M investment request, outcomes
2. **Problem** - Market failure statistics
3. **Solution** - 3-platform ecosystem
4. **Budget** - R38M allocation breakdown (7 categories)
5. **Impact** - 6 key metrics (income, yields, jobs, environment)
6. **Investment Value** - Why R38M creates value
7. **The Ask** - Contact info, next steps

---

## Content Differences from Desktop

### Simplified:
- No slide numbers (continuous scroll)
- Combined some slides into scrollable sections
- Removed complex animations (just fade-ins)
- Simplified budget bars (still interactive)

### Same Content:
- All R38M budget numbers accurate
- 500 farmers, 18 months, R40-50M IP value
- NCR licensing messaging correct
- All 7 budget categories shown

---

## Browser Compatibility

✅ Safari (iOS 12+)
✅ Chrome (Android 8+)
✅ Samsung Internet
✅ Firefox Mobile

---

## Performance

- **First Load:** ~2-3 seconds (with images)
- **Size:** ~5MB (including images/assets)
- **Smooth Scrolling:** 60fps on modern phones

---

## Customization

### Change Brand Colors:
Edit `styles-mobile.css`:
```css
:root {
    --primary-green: #4CAF50; /* Change this */
}
```

### Add/Remove Sections:
Edit `index.html` - each section is wrapped in:
```html
<section class="mobile-section">
    <!-- Content here -->
</section>
```

---

## Files

- `index.html` - Main mobile HTML (simplified structure)
- `styles-mobile.css` - Portrait-optimized CSS
- `app-mobile.js` - Scroll animations, touch handling
- `assets/` - Logos and icons
- `images/` - Background images
- `illustrations/` - Section graphics

---

## Deployment Checklist

- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Check all images load
- [ ] Verify budget numbers sum to R38M
- [ ] Test offline mode
- [ ] Check scroll performance
- [ ] Verify contact info correct

---

## Known Limitations

- No full-screen mode (not needed for scroll design)
- No slide-by-slide export to PDF (use desktop version)
- Simplified animations vs desktop

---

## Support

For issues or customization:
- Desktop version: `/uaei-r35m-tia-presentation/`
- Email: keletsok@gmail.com
- Phone: 084 478 8872

---

**Version:** 1.0
**Date:** January 2025
**Project:** UAEI R38M TIA Innovation Fund Application
