import os
import json
import time
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv

# --- CONFIGURATION ---
load_dotenv()

# Setup Cloudinary
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
JSON_PATH = os.path.normpath(os.path.join(SCRIPT_DIR, '../src/data/products.json'))
UPLOADS_DIR = os.path.normpath(os.path.join(SCRIPT_DIR, '../uploads/products'))

def upload_to_cloudinary():
    # Load products
    try:
        with open(JSON_PATH, 'r', encoding='utf-8') as f:
            products = json.load(f)
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    print(f"Loaded {len(products)} products. Starting Cloudinary upload...")

    updated_count = 0
    for index, product in enumerate(products):
        # We look for image paths starting with /uploads/products/
        image_path = product.get('image', '')
        
        if image_path.startswith('/uploads/products/'):
            # Convert relative path to absolute local path
            filename = os.path.basename(image_path)
            local_path = os.path.join(UPLOADS_DIR, filename)

            if os.path.exists(local_path):
                print(f"[{index+1}/{len(products)}] Uploading: {filename}")
                try:
                    # Upload and specify folder
                    result = cloudinary.uploader.upload(
                        local_path,
                        folder="nextgen-ecommerce/products",
                        use_filename=True,
                        unique_filename=True
                    )
                    
                    new_url = result.get('secure_url')
                    
                    # Update 'image' field
                    product['image'] = new_url
                    
                    # Update 'images' array (find existing local path and replace)
                    if 'images' in product and isinstance(product['images'], list):
                        product['images'] = [new_url if item == image_path else item for item in product['images']]
                        # If the URL is not in list at all, we might want to ensure it is
                        if new_url not in product['images']:
                            product['images'].insert(0, new_url)
                    else:
                        product['images'] = [new_url]
                        
                    print(f"   Success! Cloudinary URL: {new_url}")
                    updated_count += 1
                except Exception as e:
                    print(f"   Error uploading {filename}: {e}")
            else:
                print(f"   Warning: Local file not found at {local_path}")
        else:
            # Skip if already a Cloudinary URL or placeholder
            print(f"[{index+1}/{len(products)}] Skipping {product.get('name')} (already Cloudinary or external)")

        # Save every 5 uploads to not lose progress
        if updated_count % 5 == 0 and updated_count > 0:
            with open(JSON_PATH, 'w', encoding='utf-8') as f:
                json.dump(products, f, indent=4, ensure_ascii=False)

    # Final save
    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=4, ensure_ascii=False)
    
    print(f"\nDone! Updated {updated_count} products.")
    print("Run 'npm run data:import' next to update your MongoDB.")

if __name__ == "__main__":
    # Check if dependencies are installed
    try:
        import cloudinary
    except ImportError:
        print("Error: 'cloudinary' or 'python-dotenv' not found.")
        print("Please install them: pip install cloudinary python-dotenv")
    else:
        upload_to_cloudinary()
