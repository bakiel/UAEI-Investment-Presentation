#!/bin/bash

# Fetch unDraw illustrations for storytelling slides
# Brand color: #4CAF50

cd illustrations
echo "🎨 Fetching unDraw illustrations..."
echo ""

# Slide 3: Failure Cycle
echo "📸 Downloading: failure-cycle.svg"
curl -s "https://undraw.co/api/illustrations/cancelled?color=4CAF50" -o "failure-cycle.svg"
if [ -f "failure-cycle.svg" ]; then
    echo "   ✅ Downloaded failure-cycle.svg ($(du -h failure-cycle.svg | cut -f1))"
else
    echo "   ⚠️ Trying alternative: bug-fixing"
    curl -s "https://undraw.co/api/illustrations/bug_fixing?color=4CAF50" -o "failure-cycle.svg"
fi
echo ""

# Slide 4: The Genius (Innovation/Lightbulb)
echo "📸 Downloading: innovation-genius.svg"
curl -s "https://undraw.co/api/illustrations/lightbulb_moment?color=4CAF50" -o "innovation-genius.svg"
if [ ! -f "innovation-genius.svg" ] || [ ! -s "innovation-genius.svg" ]; then
    echo "   ⚠️ Trying alternative: ideas"
    curl -s "https://undraw.co/api/illustrations/ideas?color=4CAF50" -o "innovation-genius.svg"
fi
if [ -f "innovation-genius.svg" ]; then
    echo "   ✅ Downloaded innovation-genius.svg ($(du -h innovation-genius.svg | cut -f1))"
fi
echo ""

# Slide 6: The Breakthrough (Unlock/Success)
echo "📸 Downloading: breakthrough.svg"
curl -s "https://undraw.co/api/illustrations/unlock?color=4CAF50" -o "breakthrough.svg"
if [ ! -f "breakthrough.svg" ] || [ ! -s "breakthrough.svg" ]; then
    echo "   ⚠️ Trying alternative: stepping_up"
    curl -s "https://undraw.co/api/illustrations/stepping_up?color=4CAF50" -o "breakthrough.svg"
fi
if [ -f "breakthrough.svg" ]; then
    echo "   ✅ Downloaded breakthrough.svg ($(du -h breakthrough.svg | cut -f1))"
fi
echo ""

# Slide 7: Analogy (Prototype/Building)
echo "📸 Downloading: prototype.svg"
curl -s "https://undraw.co/api/illustrations/prototype?color=4CAF50" -o "prototype.svg"
if [ ! -f "prototype.svg" ] || [ ! -s "prototype.svg" ]; then
    echo "   ⚠️ Trying alternative: building"
    curl -s "https://undraw.co/api/illustrations/building?color=4CAF50" -o "prototype.svg"
fi
if [ -f "prototype.svg" ]; then
    echo "   ✅ Downloaded prototype.svg ($(du -h prototype.svg | cut -f1))"
fi
echo ""

echo "✅ unDraw illustrations complete!"
echo ""
echo "📁 Illustrations saved to:"
ls -lh *.svg 2>/dev/null
