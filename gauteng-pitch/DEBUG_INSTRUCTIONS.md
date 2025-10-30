# 🔍 DEBUG BLACK SLIDES - STEP BY STEP

## Step 1: Open Presentation

Open in browser: **http://localhost:8888/index.html**

## Step 2: Open Browser DevTools

**Mac:** Press `Cmd + Option + I`
**Windows:** Press `F12`

Or right-click → "Inspect"

## Step 3: Go to Console Tab

In DevTools, click the **"Console"** tab

## Step 4: Copy & Paste Debug Script

1. Open this file: `debug-console.js`
2. Copy ALL the code
3. Paste into the Console
4. Press `Enter`

## Step 5: Read the Output

The script will show you:
- ✓ How many slides exist
- ✓ If any slide is active
- ✓ What CSS properties are applied
- ✓ If content exists in slides
- ✓ Which CSS files loaded
- ❌ Any problems found

## Step 6: Automatic Fix

The script will automatically:
1. Add `.active` class to first slide
2. Force display, opacity, visibility
3. Make all children visible

## Step 7: Check Screen

After running the script:
- **Look at the presentation**
- Do you see content now?
- Can you click Next button?
- Can you use arrow keys?

## What the Results Mean:

### If You See Content After Running Script:
**PROBLEM:** CSS not loading properly or JavaScript not executing on page load

**FIX:** We need to check file paths and ensure CSS/JS loads before rendering

### If Still Black After Running Script:
**PROBLEM:** Deeper CSS conflict or HTML structure issue

**SOLUTION:** Check console for red error messages

### If You See Red Errors in Console:
**Tell me what they say** - errors will point to exact problem

## Quick Manual Test

In Console, also try this simple test:

```javascript
// Get first slide
const slide = document.querySelector('.slide');
console.log('Slide element:', slide);
console.log('Slide HTML:', slide ? slide.innerHTML.substring(0, 200) : 'NOT FOUND');
```

This shows if the slide HTML actually exists.

## Common Issues & Fixes:

### Issue 1: "Cannot read property 'classList' of null"
**Means:** Slides don't exist in HTML
**Fix:** HTML file didn't load correctly

### Issue 2: display: none, opacity: 0
**Means:** CSS is hiding slides
**Fix:** CSS file not loading or wrong rules

### Issue 3: No errors but still black
**Means:** Content is there but invisible
**Fix:** Text color matches background (both black)

## After Running Debug:

**Tell me:**
1. What did the console output say?
2. Did content appear after running script?
3. Are there any red error messages?
4. Can you navigate with arrow keys?

Then I'll know exactly what to fix!
