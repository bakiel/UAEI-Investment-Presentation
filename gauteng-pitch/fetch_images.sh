#!/bin/bash

# UAEI Image Fetcher - Bash Script using curl
# Fetches images from Pexels, Unsplash, and Pixabay APIs

PEXELS_KEY="ikaeTroGoIYfoYhCkH4eaZi8SSPB1R1Rjwq3DXAl59YLSBfcA3VxKFcs"
UNSPLASH_KEY="eMqjx_TDf5erSWvsqnHpEbMUNmmM0WLtkgHqRKm_58g"
PIXABAY_KEY="53008439-9738eb541a6c2b6d1c4a6c512"

OUTPUT_DIR="images"
mkdir -p "$OUTPUT_DIR"

echo "🌍 UAEI Image Fetcher - Starting..."
echo ""

# Function to fetch from Pexels and download first result
fetch_pexels() {
    local query="$1"
    local filename="$2"
    local url_encoded=$(echo "$query" | sed 's/ /%20/g')

    echo "📸 Fetching: $filename"
    echo "   Query: $query"
    echo "   API: PEXELS"

    # Get JSON response
    local json=$(curl -s -H "Authorization: $PEXELS_KEY" \
        "https://api.pexels.com/v1/search?query=$url_encoded&orientation=landscape&per_page=1")

    # Extract image URL using grep/sed
    local image_url=$(echo "$json" | grep -o '"original":"[^"]*"' | head -1 | sed 's/"original":"//;s/"//')

    if [ -n "$image_url" ]; then
        echo "   📷 Downloading..."
        curl -s -o "$OUTPUT_DIR/$filename" "$image_url"
        local size=$(du -h "$OUTPUT_DIR/$filename" | cut -f1)
        echo "   ✅ Downloaded: $filename ($size)"
        return 0
    else
        echo "   ❌ No image found"
        return 1
    fi
}

# Function to fetch from Unsplash
fetch_unsplash() {
    local query="$1"
    local filename="$2"
    local url_encoded=$(echo "$query" | sed 's/ /%20/g')

    echo "📸 Fetching: $filename"
    echo "   Query: $query"
    echo "   API: UNSPLASH"

    local json=$(curl -s -H "Authorization: Client-ID $UNSPLASH_KEY" \
        "https://api.unsplash.com/search/photos?query=$url_encoded&orientation=landscape&per_page=1")

    local image_url=$(echo "$json" | grep -o '"full":"[^"]*"' | head -1 | sed 's/"full":"//;s/"//')

    if [ -n "$image_url" ]; then
        echo "   📷 Downloading..."
        curl -s -o "$OUTPUT_DIR/$filename" "$image_url"
        local size=$(du -h "$OUTPUT_DIR/$filename" | cut -f1)
        echo "   ✅ Downloaded: $filename ($size)"
        return 0
    else
        echo "   ❌ No image found"
        return 1
    fi
}

# Function to fetch from Pixabay
fetch_pixabay() {
    local query="$1"
    local filename="$2"
    local url_encoded=$(echo "$query" | sed 's/ /+/g')

    echo "📸 Fetching: $filename"
    echo "   Query: $query"
    echo "   API: PIXABAY"

    local json=$(curl -s "https://pixabay.com/api/?key=$PIXABAY_KEY&q=$url_encoded&image_type=photo&orientation=horizontal&min_width=1920&per_page=1")

    local image_url=$(echo "$json" | grep -o '"largeImageURL":"[^"]*"' | head -1 | sed 's/"largeImageURL":"//;s/"//' | sed 's/\\//g')

    if [ -n "$image_url" ]; then
        echo "   📷 Downloading..."
        curl -s -o "$OUTPUT_DIR/$filename" "$image_url"
        local size=$(du -h "$OUTPUT_DIR/$filename" | cut -f1)
        echo "   ✅ Downloaded: $filename ($size)"
        return 0
    else
        echo "   ❌ No image found"
        return 1
    fi
}

echo "🎬 Starting image downloads..."
echo ""

# Slide 1: Title/Hero
fetch_pexels "African farmer smartphone technology sustainable agriculture" "slide-1-hero.jpg"
echo ""

# Slide 2: Crisis
fetch_pexels "drought Africa farming crisis" "slide-2-crisis.jpg"
echo ""

# Slide 3: Failure
fetch_pixabay "broken agriculture equipment failed" "slide-3-failure.jpg"
echo ""

# Slide 4: Innovation (HERO - African farmer with tech)
fetch_pexels "African farmer using tablet digital agriculture technology" "slide-4-innovation.jpg"
echo ""

# Slide 5: Adoption
fetch_pexels "African farmers group learning training community" "slide-5-adopt.jpg"
echo ""

# Slide 6: Loan (HERO - thriving farm)
fetch_unsplash "thriving green farm Africa organic agriculture" "slide-6-loan.jpg"
echo ""

# Slide 7: Funding
fetch_unsplash "agriculture technology IoT sensors drone farming" "slide-7-funding.jpg"
echo ""

# Slide 8: Budget
fetch_unsplash "green agricultural field aerial view from above" "slide-8-budget.jpg"
echo ""

# Slide 9: Roadmap
fetch_pixabay "plant growth stages seedling to harvest" "slide-9-roadmap.jpg"
echo ""

# Slide 10: Validation
fetch_pexels "agricultural research soil testing Africa science" "slide-10-validation.jpg"
echo ""

# Slide 11: Platform
fetch_unsplash "technology network digital infrastructure agriculture IoT" "slide-11-platform.jpg"
echo ""

# Slide 12: Revenue
fetch_pexels "abundant harvest Africa agricultural marketplace produce" "slide-12-revenue.jpg"
echo ""

# Slide 13: Impact (HERO - large scale farming)
fetch_unsplash "large scale African farming landscape green fields expansive" "slide-13-impact.jpg"
echo ""

# Slide 14: Risk
fetch_pixabay "protected crops farm insurance security" "slide-14-risk.jpg"
echo ""

# Slide 15: Gauteng
fetch_unsplash "Gauteng South Africa landscape agriculture Johannesburg" "slide-15-gauteng.jpg"
echo ""

# Slide 16: Why Now
fetch_unsplash "sunrise African farm golden hour agriculture new beginning" "slide-16-now.jpg"
echo ""

# Slide 17: Success
fetch_pexels "successful African farmer thriving farm achievement" "slide-17-success.jpg"
echo ""

# Slide 18: The Ask (HERO - partnership)
fetch_pexels "business partnership handshake agriculture Africa collaboration" "slide-18-ask.jpg"
echo ""

# Slide 19: Thank You
fetch_pexels "African farming community happy farmers celebration together" "slide-19-thankyou.jpg"
echo ""

echo ""
echo "✅ Image fetching complete!"
echo "📁 Images saved to: $OUTPUT_DIR/"
echo ""
ls -lh "$OUTPUT_DIR/"/*.jpg 2>/dev/null | wc -l | xargs echo "📊 Total images downloaded:"
