import json
import os

file_path = r'd:\Study\Project\NextGenEcommerce\backend\src\data\products.json'

with open(file_path, 'r', encoding='utf-8') as f:
    products = json.load(f)

updates = {
    220: {
        "name": "HP Omen Transcend 14",
        "brand": "HP",
        "description": "Laptop gaming 14 inch nhẹ nhất thế giới, màn hình OLED.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Gaming siêu di động</h3>\n    <p>HP Omen Transcend 14 định nghĩa lại laptop gaming di động. Trọng lượng chỉ 1.6kg nhưng vẫn chứa đựng cấu hình khủng Core Ultra 9 và RTX 4070.</p>\n    <h3>Màn hình OLED</h3>\n    <p>Màn hình OLED 2.8K 120Hz cho màu sắc rực rỡ, độ đen sâu, tuyệt vời cho cả chơi game và làm đồ họa. Bàn phím HyperX RGB mang lại cảm giác gõ tốt.</p>\n    <h3>Tổng kết</h3>\n    <p>Sự lựa chọn hoàn hảo cho game thủ hay di chuyển.</p>\n</div>",
        "price": 55990000,
        "specs": {
            "cpu": "Intel Core Ultra 9 185H",
            "ram": "32GB",
            "storage": "1TB SSD",
            "screen": "14 inch 2.8K OLED 120Hz",
            "gpu": "RTX 4070 8GB"
        },
        "highlights": [
            "Siêu nhẹ 1.6kg",
            "Màn hình OLED",
            "Bàn phím HyperX",
            "Sạc USB-C 140W"
        ]
    },
    221: {
        "name": "Dell Alienware m16 R2",
        "brand": "Dell",
        "description": "Thiết kế mới gọn gàng hơn, chế độ Stealth Mode độc đáo.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Alienware lột xác</h3>\n    <p>Alienware m16 R2 đã bỏ đi phần đuôi tản nhiệt lồi ra phía sau, giúp máy gọn gàng hơn và dễ dàng bỏ vào balo. Chế độ Stealth Mode tắt hết đèn RGB chỉ bằng một phím tắt để dùng trong môi trường văn phòng.</p>\n    <h3>Hiệu năng ổn định</h3>\n    <p>Hệ thống tản nhiệt Cryo-tech giúp máy duy trì hiệu năng cao trong thời gian dài. Màn hình QHD+ 240Hz mượt mà.</p>\n    <h3>Tổng kết</h3>\n    <p>Chiếc Alienware đa dụng nhất từ trước đến nay.</p>\n</div>",
        "price": 49990000,
        "specs": {
            "cpu": "Intel Core Ultra 7 155H",
            "ram": "16GB",
            "storage": "1TB SSD",
            "screen": "16 inch QHD+ 240Hz",
            "gpu": "RTX 4060 8GB"
        },
        "highlights": [
            "Thiết kế mới gọn hơn",
            "Stealth Mode",
            "Màn hình 240Hz",
            "Tản nhiệt Cryo-tech"
        ]
    },
    222: {
        "name": "Lenovo Legion 9i",
        "brand": "Lenovo",
        "description": "Laptop gaming tích hợp tản nhiệt nước bên trong, vỏ Carbon.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Vua của Legion</h3>\n    <p>Lenovo Legion 9i là siêu phẩm gaming đầu tiên tích hợp hệ thống tản nhiệt nước bên trong thân máy 16 inch. Vỏ máy làm từ Carbon Forged độc bản, không máy nào giống máy nào.</p>\n    <h3>Màn hình Mini LED</h3>\n    <p>Màn hình Mini LED 3.2K 165Hz cho chất lượng hiển thị HDR tuyệt đỉnh. Cấu hình kịch trần với i9 và RTX 4090.</p>\n    <h3>Tổng kết</h3>\n    <p>Biểu tượng của công nghệ và sự xa xỉ.</p>\n</div>",
        "price": 110000000,
        "specs": {
            "cpu": "Intel Core i9-14900HX",
            "ram": "64GB",
            "storage": "2TB SSD",
            "screen": "16 inch Mini LED 3.2K",
            "gpu": "RTX 4090 16GB"
        },
        "highlights": [
            "Tản nhiệt nước tích hợp",
            "Vỏ Carbon Forged",
            "Màn hình Mini LED",
            "Cấu hình Max Option"
        ]
    },
    223: {
        "name": "Acer Predator Helios 18",
        "brand": "Acer",
        "description": "Quái thú gaming 18 inch, bàn phím MagKey 3.0 thay thế được.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Predator tiến hóa</h3>\n    <p>Acer Predator Helios 18 mang lại trải nghiệm gaming choáng ngợp với màn hình 18 inch Mini LED. Điểm độc đáo là bàn phím MagKey 3.0 cho phép thay thế switch WASD để có cảm giác bấm khác nhau.</p>\n    <h3>Kết nối tiên tiến</h3>\n    <p>Hỗ trợ Wi-Fi 7 mới nhất cho tốc độ mạng siêu nhanh. Hệ thống đèn LED RGB vô cực ở khe tản nhiệt sau rất ấn tượng.</p>\n    <h3>Tổng kết</h3>\n    <p>Lựa chọn hàng đầu cho game thủ chuyên nghiệp.</p>\n</div>",
        "price": 98000000,
        "specs": {
            "cpu": "Intel Core i9-14900HX",
            "ram": "32GB",
            "storage": "2TB SSD",
            "screen": "18 inch Mini LED 250Hz",
            "gpu": "RTX 4080 12GB"
        },
        "highlights": [
            "Bàn phím MagKey 3.0",
            "Wi-Fi 7",
            "Màn hình Mini LED",
            "Logo phát sáng"
        ]
    },
    224: {
        "name": "MSI Titan 18 HX",
        "brand": "MSI",
        "description": "Laptop gaming mạnh nhất thế giới, touchpad haptic phát sáng.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Titan trở lại</h3>\n    <p>MSI Titan 18 HX là định nghĩa của sự thừa thãi sức mạnh. Nó hỗ trợ tới 128GB RAM và 3 ổ SSD M.2. Touchpad haptic liền mạch với chiếu nghỉ tay và có đèn RGB cực đẹp.</p>\n    <h3>Màn hình 4K 120Hz</h3>\n    <p>Màn hình Mini LED độ phân giải 4K 120Hz là màn hình laptop đẹp nhất hiện nay. Bàn phím cơ Cherry MX Low Profile cho cảm giác gõ tuyệt vời.</p>\n    <h3>Tổng kết</h3>\n    <p>Chiếc laptop dành cho những người muốn sở hữu thứ tốt nhất mà tiền có thể mua được.</p>\n</div>",
        "price": 149000000,
        "specs": {
            "cpu": "Intel Core i9-14900HX",
            "ram": "128GB",
            "storage": "4TB SSD",
            "screen": "18 inch 4K Mini LED 120Hz",
            "gpu": "RTX 4090 16GB"
        },
        "highlights": [
            "RAM 128GB",
            "Touchpad Haptic RGB",
            "Bàn phím Cherry MX",
            "Màn hình 4K Mini LED"
        ]
    },
    225: {
        "name": "LG Gram Pro 16",
        "brand": "LG",
        "description": "Laptop 16 inch siêu nhẹ có card rời, màn hình OLED.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Pro mà vẫn nhẹ</h3>\n    <p>LG Gram Pro 16 giữ vững truyền thống siêu nhẹ của dòng Gram nhưng bổ sung thêm card đồ họa rời RTX 3050 và màn hình OLED 144Hz. Đây là sự nâng cấp đáng giá cho những ai cần thêm chút sức mạnh đồ họa.</p>\n    <h3>Kết nối liền mạch</h3>\n    <p>Tính năng LG Gram Link giúp chia sẻ file và màn hình với điện thoại Android/iOS cực nhanh. Độ bền chuẩn quân đội vẫn được đảm bảo.</p>\n    <h3>Tổng kết</h3>\n    <p>Sự cân bằng hoàn hảo giữa tính di động và hiệu năng làm việc.</p>\n</div>",
        "price": 44990000,
        "specs": {
            "cpu": "Intel Core Ultra 7 155H",
            "ram": "16GB",
            "storage": "1TB SSD",
            "screen": "16 inch WQXGA+ OLED 144Hz",
            "gpu": "RTX 3050 4GB"
        },
        "highlights": [
            "Siêu nhẹ 1.2kg",
            "Màn hình OLED 144Hz",
            "Card rời RTX",
            "LG Gram Link"
        ]
    },
    226: {
        "name": "Gigabyte AORUS 17X",
        "brand": "Gigabyte",
        "description": "Flagship gaming của Gigabyte, tản nhiệt buồng hơi lớn.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Sức mạnh AORUS</h3>\n    <p>Gigabyte AORUS 17X được trang bị hệ thống tản nhiệt WINDFORCE Infinity với buồng hơi bao phủ toàn bộ linh kiện chính, giúp khai thác tối đa sức mạnh của i9 và RTX 4090.</p>\n    <h3>Thiết kế CNC</h3>\n    <p>Vỏ máy được cắt CNC tinh xảo, dải đèn LED RGB phía sau tạo điểm nhấn. Màn hình 17.3 inch QHD 240Hz chuẩn màu cho cả game và đồ họa.</p>\n    <h3>Tổng kết</h3>\n    <p>Cỗ máy gaming bền bỉ và mát mẻ.</p>\n</div>",
        "price": 89990000,
        "specs": {
            "cpu": "Intel Core i9-14900HX",
            "ram": "32GB",
            "storage": "2TB SSD",
            "screen": "17.3 inch QHD 240Hz",
            "gpu": "RTX 4090 16GB"
        },
        "highlights": [
            "Tản nhiệt buồng hơi",
            "Vỏ nhôm CNC",
            "Màn hình 240Hz",
            "GIGABYTE Control Center"
        ]
    },
    227: {
        "name": "Samsung Galaxy Book4 Ultra",
        "brand": "Samsung",
        "description": "Laptop mạnh nhất của Samsung, màn hình AMOLED cảm ứng.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Ultra đúng nghĩa</h3>\n    <p>Samsung Galaxy Book4 Ultra là đối thủ trực tiếp của MacBook Pro 16. Màn hình Dynamic AMOLED 2X cảm ứng mang lại trải nghiệm thị giác đỉnh cao. Hệ sinh thái Galaxy giúp kết nối liền mạch với điện thoại và máy tính bảng.</p>\n    <h3>Bảo mật Knox</h3>\n    <p>Chip bảo mật Samsung Knox đảm bảo an toàn dữ liệu tuyệt đối. Cấu hình mạnh mẽ với Core Ultra 9 và RTX 4070.</p>\n    <h3>Tổng kết</h3>\n    <p>Lựa chọn số 1 cho người dùng hệ sinh thái Samsung cần hiệu năng cao.</p>\n</div>",
        "price": 69990000,
        "specs": {
            "cpu": "Intel Core Ultra 9 185H",
            "ram": "32GB",
            "storage": "1TB SSD",
            "screen": "16 inch 3K AMOLED Touch",
            "gpu": "RTX 4070 8GB"
        },
        "highlights": [
            "Màn hình AMOLED Touch",
            "Bảo mật Knox",
            "Hệ sinh thái Galaxy",
            "Sạc nhanh 140W"
        ]
    },
    228: {
        "name": "Asus ProArt P16",
        "brand": "Asus",
        "description": "Laptop dành cho Creator chuyên nghiệp, tích hợp DialPad.",
        "detailedDescription": "<div class=\"product-review\">\n    <h3>Giấc mơ Creator</h3>\n    <p>Asus ProArt P16 được thiết kế dành riêng cho các nhà sáng tạo nội dung. Núm xoay vật lý DialPad tích hợp trên trackpad giúp điều chỉnh thông số trong Adobe nhanh chóng.</p>\n    <h3>Sức mạnh AI</h3>\n    <p>Trang bị chip AMD Ryzen AI 9 mới nhất và RTX 4070, máy xử lý mượt mà các tác vụ render 4K và AI. Màn hình 4K OLED chuẩn màu 100% DCI-P3.</p>\n    <h3>Tổng kết</h3>\n    <p>Công cụ làm việc chuyên nghiệp, bền bỉ và chính xác.</p>\n</div>",
        "price": 65990000,
        "specs": {
            "cpu": "AMD Ryzen AI 9 HX 370",
            "ram": "64GB",
            "storage": "2TB SSD",
            "screen": "16 inch 4K OLED Touch",
            "gpu": "RTX 4070 8GB"
        },
        "highlights": [
            "Asus DialPad",
            "Màn hình 4K OLED",
            "Độ bền quân đội",
            "Chip Ryzen AI 9"
        ]
    }
}

for product in products:
    if product['id'] in updates:
        product.update(updates[product['id']])

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=4, ensure_ascii=False)

print("Successfully updated products.")
