import json
import os
import time
import shutil
import sys

# Try importing different crawlers for fallback
try:
    from icrawler.builtin import BingImageCrawler, GoogleImageCrawler
except ImportError:
    print("Error: 'icrawler' library not found.")
    print("Please install it by running: pip install icrawler")
    sys.exit(1)

# --- CONFIGURATION ---
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
JSON_PATH = os.path.normpath(os.path.join(SCRIPT_DIR, '../src/data/products.json'))
OUTPUT_DIR = os.path.normpath(os.path.join(SCRIPT_DIR, '../uploads/products'))

def crawl_images():
    # Ensure output directory exists
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR, exist_ok=True)
        print(f"Created directory: {OUTPUT_DIR}")

    # Load products from JSON
    try:
        if not os.path.exists(JSON_PATH):
            print(f"Error: Could not find products.json at {JSON_PATH}")
            return
            
        with open(JSON_PATH, 'r', encoding='utf-8') as f:
            content = f.read().strip()
            if not content:
                print("Error: products.json is empty")
                return
            products = json.loads(content)
            
        if not isinstance(products, list):
            print(f"Error: Expected a list of products, got {type(products)}")
            return
            
        # Robust flattening: Ensure we have a list of dictionaries
        flat_products = []
        def flatten(items):
            for item in items:
                if isinstance(item, list):
                    flatten(item)
                elif isinstance(item, dict):
                    flat_products.append(item)
                elif item is not None:
                    print(f"Skipping invalid item type: {type(item)}")
                    
        flatten(products)
        products = flat_products
    except Exception as e:
        print(f"Error loading JSON: {e}")
        return

    print(f"Loaded {len(products)} products. Starting crawl...")

    for index, product in enumerate(products):
        # We already ensured product is a dict in the flattening step, 
        # but let's be double sure.
        if not isinstance(product, dict):
            continue
            
        product_name = product.get('name')
        if not product_name:
            continue
            
        product_brand = product.get('brand', '')
        product_id = product.get('id', index)
        
        # Only crawl if it's a placeholder image
        current_image = product.get('image', '')
        if current_image and 'loremflickr.com' not in current_image:
            print(f"[{index+1}/{len(products)}] Skipping {product_name} (already has image)")
            continue

        search_query = f"{product_brand} {product_name} laptop official product high resolution photo"
        print(f"[{index+1}/{len(products)}] Crawling for: {search_query}")

        try:
            temp_crawl_dir = os.path.join(OUTPUT_DIR, f'temp_{product_id}')
            if os.path.exists(temp_crawl_dir):
                shutil.rmtree(temp_crawl_dir)
            os.makedirs(temp_crawl_dir, exist_ok=True)

            # Bing is generally more stable and easier to crawl than Google
            crawler = BingImageCrawler(storage={'root_dir': temp_crawl_dir}, log_level=40)
            
            crawler.crawl(keyword=search_query, max_num=1, overwrite=True)
            
            downloaded_files = os.listdir(temp_crawl_dir)
            if downloaded_files:
                temp_file_name = downloaded_files[0]
                temp_file_path = os.path.join(temp_crawl_dir, temp_file_name)
                
                _, ext = os.path.splitext(temp_file_name)
                if not ext:
                    ext = ".jpg"
                
                ext = ext.split('?')[0]
                
                new_filename = f"product_{product_id}{ext}"
                final_path = os.path.join(OUTPUT_DIR, new_filename)
                
                if os.path.exists(final_path):
                    os.remove(final_path)
                shutil.move(temp_file_path, final_path)
                
                # Cập nhật đường dẫn ảnh mới
                new_image_url = f"/uploads/products/{new_filename}"
                product['image'] = new_image_url
                
                # Gắn luôn link vào mảng "images"
                if 'images' not in product or not isinstance(product['images'], list):
                    product['images'] = [new_image_url]
                else:
                    # Nếu đã có mảng images, thêm vào đầu hoặc thay thế nếu là placeholder
                    # Ở đây ta sẽ đảm bảo link mới có trong mảng
                    if new_image_url not in product['images']:
                        product['images'].insert(0, new_image_url)
                
                print(f"   Success! Saved as: {new_filename} and updated 'images' array.")
            else:
                print(f"   Warning: No image found for {product_name}")

            # Clean up temp dir
            if os.path.exists(temp_crawl_dir):
                shutil.rmtree(temp_crawl_dir)

        except Exception as e:
            print(f"   Error crawling {product_name}: {e}")

        # Small delay to be polite
        time.sleep(1)

    # Save the updated JSON back to file
    try:
        with open(JSON_PATH, 'w', encoding='utf-8') as f:
            json.dump(products, f, indent=4, ensure_ascii=False)
        print("\nDone! Products JSON has been updated.")
    except Exception as e:
        print(f"Error saving updated JSON: {e}")

if __name__ == "__main__":
    print("====================================================")
    print(" Product Image Crawler (Powered by Bing)")
    print("====================================================")
    
    crawl_images()
