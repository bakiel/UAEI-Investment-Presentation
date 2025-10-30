#!/bin/bash

# Compress all presentation images to lightweight JPEGs
# Target: 1920x1080 @ 70% quality (~200-300KB each)

cd images
echo "🗜️ Compressing images..."
echo ""

for img in slide-*.jpg; do
    if [[ ! $img =~ "-compressed" ]]; then
        echo "Processing: $img"
        magick "$img" -resize 1920x1080^ -gravity center -extent 1920x1080 -quality 70 "temp-$img"

        if [ -f "temp-$img" ]; then
            original_size=$(du -h "$img" | cut -f1)
            mv "temp-$img" "$img"
            new_size=$(du -h "$img" | cut -f1)
            echo "  ✅ $original_size → $new_size"
        else
            echo "  ❌ Compression failed"
        fi
        echo ""
    fi
done

echo "✅ All images compressed!"
echo ""
echo "📊 Total directory size:"
du -sh .
echo ""
echo "📁 Individual file sizes:"
ls -lh slide-*.jpg | awk '{print $5, $9}'
