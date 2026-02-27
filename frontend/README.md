# NexCore Electronics - Frontend

Đây là phần Frontend của dự án **NexCore Electronics**, được xây dựng bằng Next.js (App Router).

## 🚀 Công nghệ chính
- **Next.js**: Framework React mạnh mẽ cho phía client.
- **Tailwind CSS v4**: CSS framework giúp thiết kế giao diện nhanh chóng và nhất quán.
- **Radix UI**: Bộ component không style giúp xây dựng các thành phần UI phức tạp nhưng vẫn đảm bảo accessibility.
- **Lucide React**: Bộ icon tinh tế.
- **Sonner**: Thống báo đẹp mắt.
- **Embla Carousel**: Carousel mượt mà và linh hoạt.

## 🛠 Cài đặt & Phát triển

1. Di chuyển vào thư mục frontend:
   ```bash
   cd frontend
   ```

2. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   # hoặc
   yarn install
   ```

3. Cấu hình file `.env`:
   Tạo file `.env` nếu chưa có và thêm các biến cần thiết (xem file README chính ở gốc dự án).

4. Khởi động máy chủ phát triển:
   ```bash
   npm run dev
   # hoặc
   yarn dev
   ```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để xem kết quả.

## 📁 Cấu trúc thư mục
- `app/`: Các trang và route (App Router).
- `components/`: Các component dùng chung và các feature component (admin, shop, ui...).
- `context/`: Quản lý trạng thái toàn cục (Auth, Cart, Compare).
- `hooks/`: Các custom hook hữu ích.
- `lib/`: Các hàm tiện ích và cấu hình API.

---
Xem thêm chi tiết tại [README.md chính](../README.md).
