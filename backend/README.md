# NexCore Electronics - Backend API

Đây là phần Backend của dự án **NexCore Electronics**, xử lý logic nghiệp vụ và dữ liệu.

## 🚀 Công nghệ chính
- **Node.js & Express.js**: Nền tảng server-side mạnh mẽ.
- **MongoDB & Mongoose**: Hệ quản trị cơ sở dữ liệu NoSQL linh hoạt.
- **JSON Web Token (JWT)**: Xác thực và bảo mật người dùng.
- **Google Gemini AI**: Tích hợp trí tuệ nhân tạo cho ChatBot.
- **Cloudinary**: Quản lý và lưu trữ hình ảnh sản phẩm.
- **Multer**: Xử lý việc upload file.

## 🛠 Cài đặt & Phát triển

1. Di chuyển vào thư mục backend:
   ```bash
   cd backend
   ```

2. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   # hoặc
   yarn install
   ```

3. Cấu hình file `.env`:
   Tạo file `.env` và thêm các biến môi trường cần thiết (PORT, MONGO_URI, JWT_SECRET, GEMINI_API_KEY, v.v.).

4. Khởi động máy chủ:
   - Chế độ phát triển: `npm run dev`
   - Chế độ sản phẩm: `npm start`

Máy chủ sẽ chạy tại [http://localhost:5000](http://localhost:5000).

## 🔌 API Endpoints tiêu biểu
- `GET /api/products`: Lấy danh sách sản phẩm.
- `POST /api/auth/login`: Đăng nhập hệ thống.
- `GET /api/admin/orders`: Quản lý đơn hàng (Yêu cầu quyền Admin).
- `POST /api/chat`: Giao tiếp với AI ChatBot.

---
Xem thêm chi tiết tại [README.md chính](../README.md).
