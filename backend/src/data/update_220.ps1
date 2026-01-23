$path = "d:\Study\Project\NextGenEcommerce\backend\src\data\products.json"
$content = Get-Content $path -Raw -Encoding UTF8

$target = @"
        "name": "HP High-Performance Laptop 220",
        "brand": "HP",
        "description": "Dòng máy HP thế hệ mới.",
        "detailedDescription": "",
        "price": 21000000,
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
"@

$replacement = @"
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
"@

if ($content.Contains($target)) {
    $content = $content.Replace($target, $replacement)
    Set-Content $path $content -Encoding UTF8 -NoNewline
    Write-Host "Success"
} else {
    Write-Host "Target not found"
}
