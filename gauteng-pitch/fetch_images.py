#!/usr/bin/env python3
"""
Fetch images from Pixabay, Pexels, and Unsplash APIs
for UAEI Gauteng Pitch Presentation
"""

import requests
import json
import os
from urllib.parse import urlencode

# API Keys
PIXABAY_KEY = "53008439-9738eb541a6c2b6d1c4a6c512"
PEXELS_KEY = "ikaeTroGoIYfoYhCkH4eaZi8SSPB1R1Rjwq3DXAl59YLSBfcA3VxKFcs"
UNSPLASH_ACCESS_KEY = "eMqjx_TDf5erSWvsqnHpEbMUNmmM0WLtkgHqRKm_58g"

# Output directory
OUTPUT_DIR = "images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Image search queries for each slide
SLIDE_IMAGES = {
    "slide-1-hero": {
        "query": "African farmer smartphone technology sustainable",
        "api": "pexels",
        "type": "background",
        "orientation": "landscape"
    },
    "slide-2-crisis": {
        "query": "drought Africa farming",
        "api": "pexels",
        "type": "background",
        "orientation": "landscape"
    },
    "slide-3-failure": {
        "query": "broken agriculture equipment",
        "api": "pixabay",
        "type": "background",
        "orientation": "landscape"
    },
    "slide-4-innovation": {
        "query": "African farmer using tablet digital agriculture",
        "api": "pexels",
        "type": "hero",
        "orientation": "landscape"
    },
    "slide-5-adopt": {
        "query": "African farmers group learning training",
        "api": "pexels",
        "type": "background",
        "orientation": "landscape"
    },
    "slide-6-loan": {
        "query": "thriving green farm Africa organic",
        "api": "unsplash",
        "type": "hero",
        "orientation": "landscape"
    },
    "slide-7-funding": {
        "query": "agriculture technology IoT sensors drone",
        "api": "unsplash",
        "type": "background",
        "orientation": "landscape"
    },
    "slide-8-budget": {
        "query": "green agricultural field aerial view",
        "api": "unsplash",
        "type": "background",
        "orientation": "landscape"
    },
    "slide-9-roadmap": {
        "query": "plant growth stages seedling harvest",
        "api": "pixabay",
        "type": "background",
        "orientation": "landscape"
    },
    "slide-10-validation": {
        "query": "agricultural research soil testing Africa",
        "api": "pexels",
        "type": "background",
        "orientation": "landscape"
    },
    "slide-11-platform": {
        "query": "technology network digital infrastructure agriculture",
        "api": "unsplash",
        "type": "background",
        "orientation": "landscape"
    },
    "slide-12-revenue": {
        "query": "abundant harvest Africa agricultural marketplace",
        "api": "pexels",
        "type": "background",
        "orientation": "landscape"
    },
    "slide-13-impact": {
        "query": "large scale African farming landscape green",
        "api": "unsplash",
        "type": "background",
        "orientation": "landscape"
    },
    "slide-14-risk": {
        "query": "protected crops farm insurance",
        "api": "pixabay",
        "type": "background",
        "orientation": "landscape"
    },
    "slide-15-gauteng": {
        "query": "Gauteng South Africa landscape agriculture",
        "api": "unsplash",
        "type": "background",
        "orientation": "landscape"
    },
    "slide-16-now": {
        "query": "sunrise African farm golden hour agriculture",
        "api": "unsplash",
        "type": "background",
        "orientation": "landscape"
    },
    "slide-17-success": {
        "query": "successful African farmer thriving farm",
        "api": "pexels",
        "type": "background",
        "orientation": "landscape"
    },
    "slide-18-ask": {
        "query": "business partnership handshake agriculture Africa",
        "api": "pexels",
        "type": "hero",
        "orientation": "landscape"
    },
    "slide-19-thankyou": {
        "query": "African farming community happy farmers celebration",
        "api": "pexels",
        "type": "background",
        "orientation": "landscape"
    }
}


def search_pexels(query, orientation="landscape", per_page=5):
    """Search Pexels API for images"""
    url = f"https://api.pexels.com/v1/search"
    headers = {"Authorization": PEXELS_KEY}
    params = {
        "query": query,
        "orientation": orientation,
        "per_page": per_page,
        "size": "large"
    }

    try:
        response = requests.get(url, headers=headers, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()

        if data.get("photos"):
            return [
                {
                    "url": photo["src"]["original"],
                    "photographer": photo["photographer"],
                    "source": "Pexels",
                    "width": photo["width"],
                    "height": photo["height"]
                }
                for photo in data["photos"]
            ]
    except Exception as e:
        print(f"❌ Pexels error for '{query}': {e}")

    return []


def search_unsplash(query, orientation="landscape", per_page=5):
    """Search Unsplash API for images"""
    url = f"https://api.unsplash.com/search/photos"
    headers = {"Authorization": f"Client-ID {UNSPLASH_ACCESS_KEY}"}
    params = {
        "query": query,
        "orientation": orientation,
        "per_page": per_page
    }

    try:
        response = requests.get(url, headers=headers, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()

        if data.get("results"):
            return [
                {
                    "url": photo["urls"]["full"],
                    "photographer": photo["user"]["name"],
                    "source": "Unsplash",
                    "width": photo["width"],
                    "height": photo["height"]
                }
                for photo in data["results"]
            ]
    except Exception as e:
        print(f"❌ Unsplash error for '{query}': {e}")

    return []


def search_pixabay(query, orientation="horizontal", per_page=5):
    """Search Pixabay API for images"""
    url = f"https://pixabay.com/api/"
    params = {
        "key": PIXABAY_KEY,
        "q": query,
        "image_type": "photo",
        "orientation": orientation,
        "per_page": per_page,
        "min_width": 1920,
        "min_height": 1080
    }

    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()

        if data.get("hits"):
            return [
                {
                    "url": hit["largeImageURL"],
                    "photographer": hit["user"],
                    "source": "Pixabay",
                    "width": hit["imageWidth"],
                    "height": hit["imageHeight"]
                }
                for hit in data["hits"]
            ]
    except Exception as e:
        print(f"❌ Pixabay error for '{query}': {e}")

    return []


def download_image(url, filename):
    """Download image from URL to file"""
    try:
        response = requests.get(url, timeout=30, stream=True)
        response.raise_for_status()

        filepath = os.path.join(OUTPUT_DIR, filename)
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)

        file_size = os.path.getsize(filepath) / 1024  # KB
        print(f"   ✅ Downloaded: {filename} ({file_size:.1f} KB)")
        return True
    except Exception as e:
        print(f"   ❌ Download failed for {filename}: {e}")
        return False


def fetch_all_images():
    """Fetch all images for presentation slides"""
    print("🌍 UAEI Image Fetcher - Starting...\n")

    results = {}

    for slide_name, config in SLIDE_IMAGES.items():
        print(f"\n📸 {slide_name.upper()}")
        print(f"   Query: {config['query']}")
        print(f"   API: {config['api'].upper()}")

        # Search appropriate API
        images = []
        if config["api"] == "pexels":
            images = search_pexels(config["query"], config["orientation"])
        elif config["api"] == "unsplash":
            images = search_unsplash(config["query"], config["orientation"])
        elif config["api"] == "pixabay":
            images = search_pixabay(config["query"], "horizontal")

        if not images:
            print(f"   ⚠️ No images found, trying backup APIs...")
            # Try backup APIs
            if config["api"] != "pexels":
                images = search_pexels(config["query"], config["orientation"])
            if not images and config["api"] != "unsplash":
                images = search_unsplash(config["query"], config["orientation"])
            if not images and config["api"] != "pixabay":
                images = search_pixabay(config["query"], "horizontal")

        if images:
            # Get best image (first result)
            best_image = images[0]
            filename = f"{slide_name}.jpg"

            print(f"   📷 Selected: {best_image['photographer']} ({best_image['source']})")
            print(f"   Size: {best_image['width']}×{best_image['height']}")

            # Download image
            if download_image(best_image["url"], filename):
                results[slide_name] = {
                    "filename": filename,
                    "photographer": best_image["photographer"],
                    "source": best_image["source"],
                    "dimensions": f"{best_image['width']}×{best_image['height']}"
                }
        else:
            print(f"   ❌ No images found for this slide")
            results[slide_name] = None

    # Save results manifest
    manifest_path = os.path.join(OUTPUT_DIR, "manifest.json")
    with open(manifest_path, 'w') as f:
        json.dump(results, f, indent=2)

    print(f"\n\n✅ Image fetching complete!")
    print(f"📁 Images saved to: {OUTPUT_DIR}/")
    print(f"📄 Manifest saved to: {manifest_path}")

    # Summary
    successful = sum(1 for v in results.values() if v is not None)
    print(f"\n📊 Summary: {successful}/{len(SLIDE_IMAGES)} images fetched successfully")

    return results


if __name__ == "__main__":
    fetch_all_images()
