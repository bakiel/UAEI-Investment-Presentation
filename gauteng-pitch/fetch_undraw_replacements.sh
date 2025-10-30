#!/bin/bash
PEXELS_KEY="ikaeTroGoIYfoYhCkH4eaZi8SSPB1R1Rjwq3DXAl59YLSBfcA3VxKFcs"

# Image searches and output filenames
declare -A images=(
    ["african farmer success growth"]="images/farmer-growth.jpg"
    ["african farmer smartphone mobile"]="images/mobile-whatsapp.jpg"
    ["data analytics artificial intelligence"]="images/ai-credit-scoring.jpg"
    ["team collaboration african business"]="images/team-swarm.jpg"
    ["drone agriculture field aerial"]="images/drone-validation.jpg"
    ["business growth financial success"]="images/financial-scale.jpg"
)

for search in "${!images[@]}"; do
    filename="${images[$search]}"
    echo "🔍 Searching: $search"
    
    url=$(curl -s -H "Authorization: $PEXELS_KEY" \
        "https://api.pexels.com/v1/search?query=${search}&per_page=1&orientation=landscape" | \
        python3 -c "import sys, json; d=json.load(sys.stdin); print(d['photos'][0]['src']['medium'] if d.get('photos') else '')" 2>/dev/null)
    
    if [ -n "$url" ]; then
        echo "📥 Downloading to $filename"
        curl -s "$url" -o "$filename"
        echo "✅ Saved $(ls -lh $filename | awk '{print $5}')"
    else
        echo "❌ No results"
    fi
    echo ""
done
