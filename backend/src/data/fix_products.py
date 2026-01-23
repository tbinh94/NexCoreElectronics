import json
import os

file_path = r'd:\Study\Project\NextGenEcommerce\backend\src\data\products.json'

# Define the missing products
missing_products = [
    {
        "id": 254,
        "name": "Samsung Galaxy Book4 360",
        "brand": "Samsung",
        "description": "Laptop 2-in-1 linh hoạt, màn hình cảm ứng AMOLED.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Thiết kế 2-in-1 linh hoạt</h3>\n    <p>Khả năng xoay gập 360 độ cùng màn hình cảm ứng giúp bạn dễ dàng chuyển đổi giữa chế độ laptop và máy tính bảng.</p>\n    <h3>Màn hình Super AMOLED</h3>\n    <p>Màn hình Super AMOLED sống động mang lại trải nghiệm giải trí tuyệt vời.</p>\n    <h3>Tổng kết</h3>\n    <p>Đa năng và tiện dụng.</p>\n</div>",
        "price": 32990000,
        "specs": {
            "cpu": "Intel Core 5 120U",
            "ram": "16GB LPDDR5X",
            "storage": "512GB SSD",
            "screen": "15.6 inch FHD AMOLED Touch",
            "gpu": "Intel Graphics"
        },
        "highlights": [
            "Màn hình Super AMOLED",
            "S Pen kèm theo",
            "Xoay gập 360 độ"
        ]
    },
    {
        "id": 255,
        "name": "Asus Zenbook DUO (2024)",
        "brand": "Asus",
        "description": "Laptop 2 màn hình OLED 14 inch đầu tiên trên thế giới.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Hai màn hình OLED</h3>\n    <p>Thiết kế đột phá với hai màn hình OLED 14 inch 3K 120Hz, mở rộng không gian làm việc lên tối đa.</p>\n    <h3>Đa chế độ sử dụng</h3>\n    <p>Sử dụng như laptop truyền thống, máy tính bảng, hoặc màn hình kép với bàn phím Bluetooth tháo rời.</p>\n    <h3>Tổng kết</h3>\n    <p>Cách mạng hóa trải nghiệm laptop.</p>\n</div>",
        "price": 49990000,
        "specs": {
            "cpu": "Intel Core Ultra 9 185H",
            "ram": "32GB LPDDR5X",
            "storage": "1TB SSD",
            "screen": "2x 14 inch 3K OLED 120Hz",
            "gpu": "Intel Arc Graphics"
        },
        "highlights": [
            "2 màn hình OLED",
            "Bàn phím tháo rời",
            "Chân đế tích hợp"
        ]
    },
    {
        "id": 256,
        "name": "HP Envy x360 14 (2024)",
        "brand": "HP",
        "description": "Laptop 2-in-1 cao cấp, thiết kế nhôm nguyên khối.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Thiết kế sang trọng</h3>\n    <p>Vỏ nhôm nguyên khối với các đường cắt kim cương tinh xảo tạo nên vẻ đẹp cao cấp và bền bỉ.</p>\n    <h3>Màn hình OLED cảm ứng</h3>\n    <p>Màn hình OLED 2.8K hỗ trợ cảm ứng đa điểm mang lại trải nghiệm hình ảnh sắc nét và thao tác trực quan.</p>\n    <h3>Tổng kết</h3>\n    <p>Sang trọng và linh hoạt.</p>\n</div>",
        "price": 28990000,
        "specs": {
            "cpu": "Intel Core Ultra 5 125U",
            "ram": "16GB LPDDR5",
            "storage": "512GB SSD",
            "screen": "14 inch 2.8K OLED Touch",
            "gpu": "Intel Graphics"
        },
        "highlights": [
            "Màn hình OLED cảm ứng",
            "Camera 5MP",
            "Âm thanh Poly Studio"
        ]
    },
    {
        "id": 257,
        "name": "Dell Inspiron 14 Plus 7440",
        "brand": "Dell",
        "description": "Laptop văn phòng hiệu năng cao, tích hợp AI.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Hiệu năng AI mạnh mẽ</h3>\n    <p>Vi xử lý Intel Core Ultra tích hợp NPU giúp xử lý các tác vụ AI nhanh chóng và hiệu quả.</p>\n    <h3>Màn hình 2.2K sắc nét</h3>\n    <p>Màn hình độ phân giải cao mang lại hình ảnh chi tiết và sống động cho công việc và giải trí.</p>\n    <h3>Tổng kết</h3>\n    <p>Hiệu năng vượt trội trong tầm giá.</p>\n</div>",
        "price": 26990000,
        "specs": {
            "cpu": "Intel Core Ultra 7 155H",
            "ram": "16GB LPDDR5X",
            "storage": "1TB SSD",
            "screen": "14 inch 2.2K IPS",
            "gpu": "Intel Arc Graphics"
        },
        "highlights": [
            "Hiệu năng AI",
            "Màn hình 2.2K",
            "Sạc nhanh ExpressCharge"
        ]
    },
    {
        "id": 258,
        "name": "Lenovo ThinkPad X1 Carbon Gen 12",
        "brand": "Lenovo",
        "description": "Biểu tượng laptop doanh nhân, tích hợp AI.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Thiết kế Carbon Fiber</h3>\n    <p>Vỏ máy được làm từ sợi carbon siêu nhẹ và bền bỉ, mang lại vẻ ngoài đẳng cấp và khả năng di động tuyệt vời.</p>\n    <h3>Bàn phím ThinkPad huyền thoại</h3>\n    <p>Trải nghiệm gõ phím tốt nhất thế giới với hành trình phím sâu và độ nảy hoàn hảo.</p>\n    <h3>Tổng kết</h3>\n    <p>Đẳng cấp doanh nhân.</p>\n</div>",
        "price": 65990000,
        "specs": {
            "cpu": "Intel Core Ultra 7 155H",
            "ram": "32GB LPDDR5X",
            "storage": "1TB SSD",
            "screen": "14 inch 2.8K OLED 120Hz",
            "gpu": "Intel Arc Graphics"
        },
        "highlights": [
            "Bàn phím ThinkPad huyền thoại",
            "Siêu nhẹ 1.09kg",
            "Bảo mật vân tay"
        ]
    },
    {
        "id": 259,
        "name": "Acer Swift Go 14 AI",
        "brand": "Acer",
        "description": "Laptop AI giá rẻ, hiệu năng ấn tượng.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Hiệu năng AI trong tầm tay</h3>\n    <p>Trải nghiệm sức mạnh của trí tuệ nhân tạo với vi xử lý Intel Core Ultra mới nhất, giúp tối ưu hóa mọi tác vụ hàng ngày.</p>\n    <h3>Màn hình OLED rực rỡ</h3>\n    <p>Màn hình OLED 2.8K mang lại hình ảnh sắc nét, màu sắc sống động và độ tương phản tuyệt vời.</p>\n    <h3>Tổng kết</h3>\n    <p>Lựa chọn thông minh cho người dùng hiện đại.</p>\n</div>",
        "price": 22990000,
        "specs": {
            "cpu": "Intel Core Ultra 5 125H",
            "ram": "16GB LPDDR5X",
            "storage": "512GB SSD",
            "screen": "14 inch 2.8K OLED 90Hz",
            "gpu": "Intel Arc Graphics"
        },
        "highlights": [
            "Màn hình OLED 2.8K",
            "Camera QHD AI",
            "Pin 10 tiếng"
        ]
    },
    {
        "id": 260,
        "name": "MSI Prestige 16 AI Evo",
        "brand": "MSI",
        "description": "Laptop doanh nhân 16 inch nhẹ nhất, pin trâu nhất.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Di động tối đa</h3>\n    <p>Với trọng lượng chỉ 1.5kg và viên pin khủng 99.9Wh, Prestige 16 AI Evo là người bạn đồng hành lý tưởng cho những chuyến công tác dài ngày.</p>\n    <h3>Kết nối siêu tốc</h3>\n    <p>Hỗ trợ Wi-Fi 7 mới nhất cho tốc độ kết nối internet nhanh chóng và ổn định.</p>\n    <h3>Tổng kết</h3>\n    <p>Doanh nhân thời đại mới.</p>\n</div>",
        "price": 42990000,
        "specs": {
            "cpu": "Intel Core Ultra 7 155H",
            "ram": "32GB LPDDR5",
            "storage": "1TB SSD",
            "screen": "16 inch QHD+ IPS 165Hz",
            "gpu": "Intel Arc Graphics"
        },
        "highlights": [
            "Pin 99.9Wh",
            "Nhẹ 1.5kg",
            "Wi-Fi 7"
        ]
    },
    {
        "id": 261,
        "name": "LG Gram 16 2-in-1 (2024)",
        "brand": "LG",
        "description": "Laptop 2-in-1 16 inch nhẹ nhất thế giới.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Linh hoạt tối đa</h3>\n    <p>Khả năng xoay gập 360 độ biến LG Gram 16 từ một chiếc laptop mạnh mẽ thành một chiếc máy tính bảng màn hình lớn tiện dụng.</p>\n    <h3>Nhẹ không tưởng</h3>\n    <p>Dù là laptop 2-in-1 16 inch nhưng máy chỉ nặng 1.4kg, giúp bạn dễ dàng mang theo mọi nơi.</p>\n    <h3>Tổng kết</h3>\n    <p>Sáng tạo không giới hạn.</p>\n</div>",
        "price": 45990000,
        "specs": {
            "cpu": "Intel Core Ultra 7 155H",
            "ram": "16GB LPDDR5X",
            "storage": "512GB SSD",
            "screen": "16 inch WQXGA IPS Touch",
            "gpu": "Intel Arc Graphics"
        },
        "highlights": [
            "Xoay gập 360 độ",
            "Siêu nhẹ 1.4kg",
            "Bút Stylus đi kèm"
        ]
    },
    {
        "id": 262,
        "name": "Gigabyte AORUS 15 (2024)",
        "brand": "Gigabyte",
        "description": "Laptop gaming mỏng nhẹ, hiệu năng cao.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Hiệu năng ấn tượng</h3>\n    <p>Trang bị vi xử lý Intel Core Ultra 7 và card đồ họa RTX 4060, AORUS 15 mang lại hiệu năng chơi game mượt mà.</p>\n    <h3>Màn hình QHD 165Hz</h3>\n    <p>Màn hình độ phân giải cao với tần số quét 165Hz giúp bạn không bỏ lỡ bất kỳ khoảnh khắc nào trong game.</p>\n    <h3>Tổng kết</h3>\n    <p>Chiến binh gaming thực thụ.</p>\n</div>",
        "price": 42990000,
        "specs": {
            "cpu": "Intel Core Ultra 7 155H",
            "ram": "16GB DDR5",
            "storage": "1TB SSD",
            "screen": "15.6 inch QHD 165Hz",
            "gpu": "RTX 4060 8GB"
        },
        "highlights": [
            "Màn hình QHD 165Hz",
            "Tản nhiệt WINDFORCE",
            "MUX Switch"
        ]
    },
    {
        "id": 263,
        "name": "Samsung Galaxy Book4 Pro 16",
        "brand": "Samsung",
        "description": "Laptop doanh nhân màn hình lớn, mỏng nhẹ.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Màn hình AMOLED 3K</h3>\n    <p>Màn hình 16 inch Dynamic AMOLED 2X độ phân giải 3K mang lại trải nghiệm hình ảnh tuyệt đẹp.</p>\n    <h3>Hiệu năng mạnh mẽ</h3>\n    <p>Vi xử lý Intel Core Ultra 7 giúp xử lý mượt mà mọi tác vụ văn phòng và sáng tạo.</p>\n    <h3>Tổng kết</h3>\n    <p>Sang trọng và đẳng cấp.</p>\n</div>",
        "price": 44990000,
        "specs": {
            "cpu": "Intel Core Ultra 7 155H",
            "ram": "16GB LPDDR5X",
            "storage": "1TB SSD",
            "screen": "16 inch 3K AMOLED 120Hz",
            "gpu": "Intel Arc Graphics"
        },
        "highlights": [
            "Màn hình AMOLED 3K",
            "Thiết kế siêu mỏng",
            "Hệ sinh thái Galaxy"
        ]
    },
    {
        "id": 264,
        "name": "Asus ROG Zephyrus G14 (2024)",
        "brand": "Asus",
        "description": "Laptop gaming 14 inch mỏng nhẹ nhất thế giới.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Thiết kế nhôm nguyên khối</h3>\n    <p>Vỏ máy được gia công CNC từ nhôm nguyên khối, mang lại vẻ đẹp sang trọng và độ bền vượt trội.</p>\n    <h3>Màn hình OLED 3K</h3>\n    <p>Màn hình OLED 14 inch độ phân giải 3K với tần số quét 120Hz mang lại trải nghiệm hình ảnh sắc nét và sống động.</p>\n    <h3>Tổng kết</h3>\n    <p>Đỉnh cao của sự tinh tế.</p>\n</div>",
        "price": 54990000,
        "specs": {
            "cpu": "AMD Ryzen 9 8945HS",
            "ram": "32GB LPDDR5X",
            "storage": "1TB SSD",
            "screen": "14 inch 3K OLED 120Hz",
            "gpu": "RTX 4070 8GB"
        },
        "highlights": [
            "Màn hình OLED 3K",
            "Thiết kế Slash Lighting",
            "Siêu mỏng 1.59cm"
        ]
    },
    {
        "id": 265,
        "name": "HP Omen Transcend 16",
        "brand": "HP",
        "description": "Laptop gaming màn hình OLED đầu tiên của HP.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Màn hình OLED 240Hz</h3>\n    <p>Màn hình OLED 16 inch với tần số quét 240Hz mang lại trải nghiệm chơi game mượt mà và màu sắc sống động.</p>\n    <h3>Thiết kế mỏng nhẹ</h3>\n    <p>Dù là laptop gaming 16 inch nhưng máy chỉ nặng 2.1kg và mỏng 19.9mm.</p>\n    <h3>Tổng kết</h3>\n    <p>Tiên phong công nghệ.</p>\n</div>",
        "price": 59990000,
        "specs": {
            "cpu": "Intel Core i9-14900HX",
            "ram": "32GB DDR5",
            "storage": "1TB SSD",
            "screen": "16 inch 2.5K OLED 240Hz",
            "gpu": "RTX 4070 8GB"
        },
        "highlights": [
            "Màn hình OLED 240Hz",
            "Tản nhiệt OMEN Tempest",
            "Nhẹ 2.1kg"
        ]
    },
    {
        "id": 266,
        "name": "Dell Alienware m16 R2",
        "brand": "Dell",
        "description": "Laptop gaming hiệu năng cao, thiết kế mới.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Thiết kế Legend 3.0</h3>\n    <p>Thiết kế mới giúp tối ưu hóa luồng khí và giảm kích thước máy 15% so với thế hệ trước.</p>\n    <h3>Chế độ Stealth Mode</h3>\n    <p>Chuyển đổi nhanh chóng giữa chế độ hiệu năng cao và chế độ yên tĩnh chỉ bằng một phím bấm.</p>\n    <h3>Tổng kết</h3>\n    <p>Mạnh mẽ và linh hoạt.</p>\n</div>",
        "price": 64990000,
        "specs": {
            "cpu": "Intel Core Ultra 9 185H",
            "ram": "32GB DDR5",
            "storage": "1TB SSD",
            "screen": "16 inch QHD+ 240Hz",
            "gpu": "RTX 4070 8GB"
        },
        "highlights": [
            "Thiết kế Legend 3.0",
            "Stealth Mode",
            "Tản nhiệt Cryo-tech"
        ]
    },
    {
        "id": 267,
        "name": "Lenovo Legion Slim 7i Gen 8",
        "brand": "Lenovo",
        "description": "Laptop gaming mỏng nhẹ, pin trâu.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Thiết kế kim loại</h3>\n    <p>Vỏ máy được làm hoàn toàn từ kim loại, mang lại cảm giác chắc chắn và sang trọng.</p>\n    <h3>Pin 99.9Wh</h3>\n    <p>Viên pin dung lượng lớn nhất cho phép trên laptop giúp bạn chơi game và làm việc cả ngày dài.</p>\n    <h3>Tổng kết</h3>\n    <p>Cân bằng hoàn hảo.</p>\n</div>",
        "price": 48990000,
        "specs": {
            "cpu": "Intel Core i9-13900H",
            "ram": "32GB DDR5",
            "storage": "1TB SSD",
            "screen": "16 inch 3.2K IPS 165Hz",
            "gpu": "RTX 4070 8GB"
        },
        "highlights": [
            "Pin 99.9Wh",
            "Màn hình 3.2K PureSight",
            "Bàn phím TrueStrike"
        ]
    },
    {
        "id": 268,
        "name": "Acer Predator Helios Neo 16",
        "brand": "Acer",
        "description": "Laptop gaming hiệu năng cao, giá tốt.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Hiệu năng vượt trội</h3>\n    <p>Sự kết hợp giữa Core i9-14900HX và RTX 4070 mang lại hiệu năng chơi game đỉnh cao trong tầm giá.</p>\n    <h3>Màn hình WQXGA 240Hz</h3>\n    <p>Màn hình độ phân giải cao và tần số quét nhanh giúp bạn luôn đi trước đối thủ một bước.</p>\n    <h3>Tổng kết</h3>\n    <p>Ông vua phân khúc tầm trung.</p>\n</div>",
        "price": 44990000,
        "specs": {
            "cpu": "Intel Core i9-14900HX",
            "ram": "16GB DDR5",
            "storage": "1TB SSD",
            "screen": "16 inch WQXGA 240Hz",
            "gpu": "RTX 4070 8GB"
        },
        "highlights": [
            "Màn hình 240Hz",
            "Tản nhiệt AeroBlade 3D",
            "Phím nóng Predator Sense"
        ]
    },
    {
        "id": 269,
        "name": "MSI Vector GP68 HX",
        "brand": "MSI",
        "description": "Laptop gaming hiệu năng thuần túy.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Sức mạnh tối thượng</h3>\n    <p>Trang bị vi xử lý Intel Core i9-13980HX và card đồ họa RTX 4080, Vector GP68 HX sẵn sàng thách thức mọi tựa game.</p>\n    <h3>Tản nhiệt Cooler Boost 5</h3>\n    <p>Hệ thống tản nhiệt 2 quạt và 6 ống dẫn nhiệt đảm bảo máy luôn mát mẻ.</p>\n    <h3>Tổng kết</h3>\n    <p>Hiệu năng là trên hết.</p>\n</div>",
        "price": 65990000,
        "specs": {
            "cpu": "Intel Core i9-13980HX",
            "ram": "32GB DDR5",
            "storage": "1TB SSD",
            "screen": "16 inch QHD+ 240Hz",
            "gpu": "RTX 4080 12GB"
        },
        "highlights": [
            "Hiệu năng khủng",
            "Màn hình 240Hz",
            "Bàn phím SteelSeries"
        ]
    },
    {
        "id": 270,
        "name": "LG Gram 14 (2024)",
        "brand": "LG",
        "description": "Laptop 14 inch siêu nhẹ, pin trâu.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Nhẹ như không</h3>\n    <p>Trọng lượng chỉ 999g, LG Gram 14 là chiếc laptop 14 inch nhẹ nhất thế giới.</p>\n    <h3>Thời lượng pin 25 giờ</h3>\n    <p>Viên pin 72Wh cho thời gian sử dụng lên tới 25 giờ, giúp bạn làm việc cả ngày mà không cần sạc.</p>\n    <h3>Tổng kết</h3>\n    <p>Di động tuyệt đối.</p>\n</div>",
        "price": 35990000,
        "specs": {
            "cpu": "Intel Core Ultra 5 125H",
            "ram": "16GB LPDDR5X",
            "storage": "512GB SSD",
            "screen": "14 inch WUXGA IPS",
            "gpu": "Intel Arc Graphics"
        },
        "highlights": [
            "Siêu nhẹ 999g",
            "Pin 25 giờ",
            "Độ bền quân đội"
        ]
    },
    {
        "id": 271,
        "name": "Gigabyte G5 KF",
        "brand": "Gigabyte",
        "description": "Laptop gaming giá rẻ, hiệu năng cao.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Hiệu năng tốt trong tầm giá</h3>\n    <p>Với Core i5-12500H và RTX 4060, Gigabyte G5 KF mang lại hiệu năng chơi game ấn tượng với mức giá phải chăng.</p>\n    <h3>Màn hình 144Hz</h3>\n    <p>Màn hình tần số quét cao giúp trải nghiệm chơi game mượt mà hơn.</p>\n    <h3>Tổng kết</h3>\n    <p>Lựa chọn kinh tế cho game thủ.</p>\n</div>",
        "price": 24990000,
        "specs": {
            "cpu": "Intel Core i5-12500H",
            "ram": "16GB DDR4",
            "storage": "512GB SSD",
            "screen": "15.6 inch FHD 144Hz",
            "gpu": "RTX 4060 8GB"
        },
        "highlights": [
            "Giá tốt",
            "Màn hình 144Hz",
            "Nhẹ 1.9kg"
        ]
    },
    {
        "id": 272,
        "name": "Samsung Galaxy Book4 Pro 360",
        "brand": "Samsung",
        "description": "Laptop 2-in-1 16 inch mỏng nhẹ, màn hình AMOLED.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Thiết kế 2-in-1 linh hoạt</h3>\n    <p>Khả năng xoay gập 360 độ cùng màn hình cảm ứng giúp bạn dễ dàng chuyển đổi giữa chế độ laptop và máy tính bảng.</p>\n    <h3>Màn hình Dynamic AMOLED 2X</h3>\n    <p>Màn hình 16 inch độ phân giải 3K mang lại trải nghiệm hình ảnh sống động và chân thực.</p>\n    <h3>Tổng kết</h3>\n    <p>Đa năng và mạnh mẽ.</p>\n</div>",
        "price": 59990000,
        "specs": {
            "cpu": "Intel Core Ultra 7 155H",
            "ram": "16GB LPDDR5X",
            "storage": "1TB SSD",
            "screen": "16 inch 3K AMOLED Touch",
            "gpu": "Intel Arc Graphics"
        },
        "highlights": [
            "Màn hình AMOLED 3K",
            "S Pen kèm theo",
            "Xoay gập 360 độ"
        ]
    },
    {
        "id": 273,
        "name": "Asus Vivobook Pro 15 OLED",
        "brand": "Asus",
        "description": "Laptop Creator trẻ trung, màn hình OLED.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Màn hình OLED 2.8K</h3>\n    <p>Màn hình OLED 15.6 inch độ phân giải 2.8K 120Hz mang lại màu sắc chính xác và chuyển động mượt mà.</p>\n    <h3>Hiệu năng sáng tạo</h3>\n    <p>Vi xử lý Ryzen 7 và card đồ họa RTX 4060 giúp bạn thỏa sức sáng tạo nội dung.</p>\n    <h3>Tổng kết</h3>\n    <p>Dành cho Gen Z năng động.</p>\n</div>",
        "price": 32990000,
        "specs": {
            "cpu": "AMD Ryzen 7 7840HS",
            "ram": "16GB LPDDR5X",
            "storage": "512GB SSD",
            "screen": "15.6 inch 2.8K OLED 120Hz",
            "gpu": "RTX 4060 8GB"
        },
        "highlights": [
            "Màn hình OLED 2.8K",
            "Thiết kế trẻ trung",
            "DialPad ảo"
        ]
    },
    {
        "id": 274,
        "name": "HP EliteBook Ultra G1q",
        "brand": "HP",
        "description": "Laptop AI doanh nghiệp, bảo mật hàng đầu.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Bảo mật Wolf Security</h3>\n    <p>Hệ thống bảo mật toàn diện từ phần cứng đến phần mềm giúp bảo vệ dữ liệu doanh nghiệp an toàn tuyệt đối.</p>\n    <h3>Hiệu năng AI</h3>\n    <p>Tối ưu hóa quy trình làm việc với các tính năng AI thông minh và vi xử lý Snapdragon X Elite.</p>\n    <h3>Tổng kết</h3>\n    <p>An toàn và hiệu quả.</p>\n</div>",
        "price": 49990000,
        "specs": {
            "cpu": "Snapdragon X Elite",
            "ram": "16GB LPDDR5X",
            "storage": "512GB SSD",
            "screen": "14 inch 2.2K IPS Touch",
            "gpu": "Qualcomm Adreno"
        },
        "highlights": [
            "Snapdragon X Elite",
            "Wolf Security",
            "Pin 26 giờ"
        ]
    },
    {
        "id": 275,
        "name": "Dell XPS 16 9640",
        "brand": "Dell",
        "description": "Laptop 16 inch mạnh mẽ nhất của Dell.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Thiết kế tương lai</h3>\n    <p>Thiết kế tối giản, sang trọng với bàn phím Zero-Lattice và Touchpad vô hình.</p>\n    <h3>Hiệu năng đỉnh cao</h3>\n    <p>Trang bị vi xử lý Intel Core Ultra 9 và card đồ họa RTX 4070, XPS 16 sẵn sàng cho mọi tác vụ nặng.</p>\n    <h3>Tổng kết</h3>\n    <p>Biểu tượng công nghệ.</p>\n</div>",
        "price": 79990000,
        "specs": {
            "cpu": "Intel Core Ultra 9 185H",
            "ram": "32GB LPDDR5X",
            "storage": "1TB SSD",
            "screen": "16.3 inch 4K OLED Touch",
            "gpu": "RTX 4070 8GB"
        },
        "highlights": [
            "Màn hình OLED 4K",
            "Thiết kế Zero-Lattice",
            "Touchpad vô hình"
        ]
    },
    {
        "id": 276,
        "name": "Lenovo Yoga 9i 2-in-1",
        "brand": "Lenovo",
        "description": "Laptop 2-in-1 cao cấp nhất của Lenovo.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Thiết kế Comfort Edge</h3>\n    <p>Các cạnh bo tròn mềm mại mang lại cảm giác cầm nắm thoải mái và vẻ đẹp tinh tế.</p>\n    <h3>Âm thanh Bowers & Wilkins</h3>\n    <p>Hệ thống loa xoay 360 độ mang lại trải nghiệm âm thanh vòm sống động ở mọi chế độ sử dụng.</p>\n    <h3>Tổng kết</h3>\n    <p>Tuyệt tác 2-in-1.</p>\n</div>",
        "price": 49990000,
        "specs": {
            "cpu": "Intel Core Ultra 7 155H",
            "ram": "16GB LPDDR5X",
            "storage": "1TB SSD",
            "screen": "14 inch 4K OLED Touch",
            "gpu": "Intel Arc Graphics"
        },
        "highlights": [
            "Loa xoay 360 độ",
            "Màn hình OLED 4K",
            "Bút Precision Pen 2"
        ]
    },
    {
        "id": 277,
        "name": "Acer Swift Edge 16",
        "brand": "Acer",
        "description": "Laptop 16 inch mỏng nhẹ nhất thế giới.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Mỏng nhẹ không tưởng</h3>\n    <p>Với độ mỏng chỉ 12.95mm và trọng lượng 1.23kg, Swift Edge 16 định nghĩa lại sự di động của laptop màn hình lớn.</p>\n    <h3>Màn hình OLED 3.2K</h3>\n    <p>Màn hình OLED độ phân giải cao mang lại trải nghiệm hình ảnh sắc nét và sống động.</p>\n    <h3>Tổng kết</h3>\n    <p>Di động và mạnh mẽ.</p>\n</div>",
        "price": 39990000,
        "specs": {
            "cpu": "AMD Ryzen 7 7840U",
            "ram": "16GB LPDDR5",
            "storage": "1TB SSD",
            "screen": "16 inch 3.2K OLED 120Hz",
            "gpu": "AMD Radeon 780M"
        },
        "highlights": [
            "Siêu mỏng 12.95mm",
            "Màn hình OLED 3.2K",
            "Wi-Fi 7"
        ]
    },
    {
        "id": 278,
        "name": "MSI Stealth 16 AI Studio",
        "brand": "MSI",
        "description": "Laptop gaming mỏng nhẹ, thiết kế Studio.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Thiết kế Studio</h3>\n    <p>Vỏ máy làm từ hợp kim nhôm-magie siêu nhẹ, mang lại vẻ ngoài thanh lịch và chuyên nghiệp.</p>\n    <h3>Hiệu năng AI</h3>\n    <p>Tối ưu hóa cho các ứng dụng sáng tạo và AI với vi xử lý Intel Core i9 và card đồ họa RTX 4070.</p>\n    <h3>Tổng kết</h3>\n    <p>Sáng tạo không giới hạn.</p>\n</div>",
        "price": 59990000,
        "specs": {
            "cpu": "Intel Core i9-13900H",
            "ram": "32GB DDR5",
            "storage": "2TB SSD",
            "screen": "16 inch QHD+ 240Hz",
            "gpu": "RTX 4070 8GB"
        },
        "highlights": [
            "Thiết kế Studio",
            "Màn hình 240Hz",
            "Pin 99.9Wh"
        ]
    },
    {
        "id": 279,
        "name": "LG Gram 15 (2024)",
        "brand": "LG",
        "description": "Laptop 15 inch siêu nhẹ, màn hình lớn.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Màn hình lớn, trọng lượng nhẹ</h3>\n    <p>Màn hình 15.6 inch nhưng trọng lượng chỉ 1.12kg, LG Gram 15 là sự cân bằng hoàn hảo giữa không gian làm việc và tính di động.</p>\n    <h3>Độ bền quân đội</h3>\n    <p>Đạt chuẩn độ bền quân đội MIL-STD-810H, đảm bảo máy hoạt động bền bỉ trong mọi điều kiện.</p>\n    <h3>Tổng kết</h3>\n    <p>Bền bỉ và di động.</p>\n</div>",
        "price": 32990000,
        "specs": {
            "cpu": "Intel Core Ultra 5 125H",
            "ram": "16GB LPDDR5X",
            "storage": "512GB SSD",
            "screen": "15.6 inch FHD IPS",
            "gpu": "Intel Arc Graphics"
        },
        "highlights": [
            "Siêu nhẹ 1.12kg",
            "Pin 23 giờ",
            "Độ bền quân đội"
        ]
    },
    {
        "id": 280,
        "name": "Gigabyte AORUS 17 (2024)",
        "brand": "Gigabyte",
        "description": "Laptop gaming màn hình lớn, hiệu năng cao.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Màn hình 17 inch 240Hz</h3>\n    <p>Màn hình lớn 17.3 inch với tần số quét 240Hz mang lại trải nghiệm chơi game đắm chìm và mượt mà.</p>\n    <h3>Hiệu năng AI</h3>\n    <p>Tối ưu hóa hiệu năng chơi game với công nghệ AI và vi xử lý Intel Core Ultra 9.</p>\n    <h3>Tổng kết</h3>\n    <p>Trải nghiệm gaming đỉnh cao.</p>\n</div>",
        "price": 62990000,
        "specs": {
            "cpu": "Intel Core Ultra 9 185H",
            "ram": "32GB DDR5",
            "storage": "1TB SSD",
            "screen": "17.3 inch QHD 240Hz",
            "gpu": "RTX 4070 8GB"
        },
        "highlights": [
            "Màn hình 17 inch 240Hz",
            "Tản nhiệt WINDFORCE Infinity",
            "AI Gaming"
        ]
    },
    {
        "id": 281,
        "name": "Samsung Galaxy Book4 Ultra",
        "brand": "Samsung",
        "description": "Laptop đồ họa mỏng nhẹ, màn hình AMOLED.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Màn hình Dynamic AMOLED 2X</h3>\n    <p>Màn hình 16 inch 3K 120Hz mang lại chất lượng hình ảnh tuyệt vời cho công việc đồ họa và giải trí.</p>\n    <h3>Hiệu năng mạnh mẽ</h3>\n    <p>Trang bị vi xử lý Intel Core Ultra 9 và card đồ họa RTX 4070, đáp ứng mọi nhu cầu sáng tạo chuyên nghiệp.</p>\n    <h3>Tổng kết</h3>\n    <p>Đỉnh cao của sự sáng tạo.</p>\n</div>",
        "price": 79990000,
        "specs": {
            "cpu": "Intel Core Ultra 9 185H",
            "ram": "32GB LPDDR5X",
            "storage": "1TB SSD",
            "screen": "16 inch 3K AMOLED 120Hz",
            "gpu": "RTX 4070 8GB"
        },
        "highlights": [
            "Màn hình AMOLED 3K",
            "Thiết kế siêu mỏng",
            "Sạc nhanh 140W"
        ]
    },
    {
        "id": 282,
        "name": "Asus High-Performance Laptop 282",
        "brand": "Asus",
        "description": "Dòng máy Asus thế hệ mới.",
        "detailedDescription": "",
        "price": 83000000,
        "specs": {
            "cpu": "Core Ultra 5/7 / Ryzen 7",
            "ram": "16GB/32GB",
            "screen": "14-16 inch High Res"
        },
        "highlights": [
            "Hiệu năng AI",
            "Màn hình chuẩn màu",
            "Pin trâu"
        ]
    }
]

# Read the file as text
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the start of ID 253
start_index = -1
for i, line in enumerate(lines):
    if '"id": 253' in line:
        start_index = i
        break

if start_index != -1:
    # Find the malformed highlights block
    # It starts with "highlights": [
    # And ends with },
    # But we want to replace the whole block of ID 253's highlights AND insert the missing products.
    
    # Locate "highlights": [ after start_index
    highlights_start = -1
    for i in range(start_index, len(lines)):
        if '"highlights": [' in lines[i]:
            highlights_start = i
            break
    
    if highlights_start != -1:
        # Locate the end of the malformed block. It ends with }, before ID 283
        # We know ID 283 starts with { "id": 283
        
        end_index = -1
        for i in range(highlights_start, len(lines)):
            if '"id": 283' in lines[i]:
                # The previous line should be { (start of 283) so the line before that is }, (end of 253/malformed block)
                # Wait, let's look at the file structure.
                # ...
                # },
                # {
                #     "id": 283,
                
                # So if lines[i] contains "id": 283, then lines[i-1] is { and lines[i-2] is },
                end_index = i - 2
                break
        
        if end_index != -1:
            # Construct the new content
            # 1. Correct highlights for ID 253
            new_lines = [
                '        "highlights": [\n',
                '            "Màn hình OLED chuẩn màu",\n',
                '            "Nhẹ 1.49kg",\n',
                '            "Thiết kế nhôm CNC"\n',
                '        ]\n',
                '    },\n'
            ]
            
            # 2. Insert missing products
            for product in missing_products:
                product_str = json.dumps(product, ensure_ascii=False, indent=4)
                # Indent the product string
                indented_product = []
                for line in product_str.split('\n'):
                    indented_product.append('    ' + line + '\n')
                
                # Add comma to the last line if it's not the last product in the list?
                # Actually, all products in the list need a comma after }, EXCEPT the last one IF it's the last in the file.
                # But here we are inserting BEFORE ID 283. So ALL inserted products must have a comma after },
                
                # Modify the last line of the indented product to add a comma
                indented_product[-1] = indented_product[-1].replace('}', '},')
                
                new_lines.extend(indented_product)
            
            # Replace the lines
            # lines[highlights_start : end_index + 1] are the malformed block.
            # The malformed block ends at end_index (which is },)
            # We want to replace from highlights_start to end_index.
            
            lines[highlights_start : end_index + 1] = new_lines
            
            # Write back
            with open(file_path, 'w', encoding='utf-8') as f:
                f.writelines(lines)
            
            print("Successfully fixed products.json")
        else:
            print("Could not find end of malformed block (ID 283)")
    else:
        print("Could not find highlights start for ID 253")
else:
    print("Could not find ID 253")
