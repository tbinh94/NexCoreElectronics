# NexCore Electronics - Cửa hàng Công nghệ Hiện đại

NexCore Electronics là một nền tảng thương mại điện tử chuyên sâu về các sản phẩm công nghệ như Laptop, Macbook, PC và linh kiện điện tử. Dự án được xây dựng với mục tiêu mang lại trải nghiệm mua sắm mượt mà, hiện đại và tích hợp trí tuệ nhân tạo.

## 🚀 Tính năng nổi bật

### 🛒 Dành cho Người dùng (Frontend)
- **Trải nghiệm mua sắm hiện đại**: Giao diện responsive, tối ưu hóa cho cả di động và desktop.
- **Hệ thống Tìm kiếm & Lọc**: Bộ lọc sản phẩm thông minh theo thương hiệu, giá cả, cấu hình.
- **Tìm kiếm bằng Hình ảnh**: Công nghệ tìm kiếm sản phẩm thông minh qua ảnh tải lên.
- **Hệ thống Đánh giá**: Khách hàng có thể để lại bình luận và đánh giá sao cho sản phẩm.
- **Hệ thống FAQ**: Giải đáp các thắc mắc thường gặp một cách tự động.
- **Giỏ hàng & Thanh toán**: Quản lý giỏ hàng nhanh chóng và quy trình thanh toán mượt mà.
- **So sánh Sản phẩm**: Tính năng so sánh thông số kỹ thuật trực quan.
- **Hệ thống VIP Tier**: Đăng ký thành viên VIP với các ưu đãi độc quyền và bảng giá linh hoạt.
- **AI ChatBot**: Hỗ trợ khách hàng 24/7 tích hợp Google Gemini AI.
- **Thu cũ đổi mới (Trade-in)**: Quy trình đánh giá và hỗ trợ thu đổi máy cũ chuyên nghiệp.
- **Hỗ trợ đa chế độ**: Chế độ Sáng (Light) và Tối (Dark) linh hoạt.
- **Đăng nhập Google**: Tích hợp Google OAuth tiện lợi.

### 🔐 Dành cho Quản trị viên (Admin Dashboard)
- **Quản lý Sản phẩm**: Thêm, sửa, xóa sản phẩm với hệ thống upload hình ảnh qua Cloudinary.
- **Quản lý Đơn hàng**: Theo dõi trạng thái và xử lý đơn hàng của khách hàng.
- **Quản lý Khách hàng**: Quản lý thông tin người dùng và phân quyền.
- **Quản lý Trade-in**: Theo dõi các yêu cầu thu cũ đổi mới từ khách hàng.
- **Thống kê**: Tổng quan doanh thu và hoạt động kinh doanh.

## 🛠 Công nghệ sử dụng

### Frontend
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4
- **Thư viện UI**: Radix UI, Lucide Icons
- **Quản lý Form**: React Hook Form + Zod
- **Xác thực**: Google OAuth, JWT
- **Thông báo**: Sonner
- **Carousel**: Embla Carousel

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **AI**: Google Generative AI (Gemini API)
- **Cloud Media**: Cloudinary (Image management)
- **Security**: JWT, Bcrypt, Express Rate Limit

## 📥 Hướng dẫn cài đặt

### Yêu cầu hệ thống
- Node.js (phiên bản mới nhất khuyến nghị)
- Yarn hoặc NPM
- MongoDB Atlas account (hoặc local MongoDB)
- Google Gemini API Key
- Cloudinary account

### Các bước cài đặt

1. **Clone repository**:
   ```bash
   git clone <repository_url>
   cd NexCoreElectronics
   ```

2. **Cài đặt dependencies**:
   ```bash
   # Cài đặt cho cả frontend và backend (sử dụng yarn workspace)
   yarn install:all
   ```

3. **Cấu hình môi trường (Environment Variables)**:

   **Backend (`/backend/.env`):**
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```

   **Frontend (`/frontend/.env`):**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. **Chạy ứng dụng**:
   ```bash
   # Chạy đồng thời cả frontend và backend
   yarn dev
   ```
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:5000](http://localhost:5000)

## 📁 Cấu trúc thư mục

```text
NexCoreElectronics/
├── frontend/           # Next.js application
│   ├── app/            # App Router pages
│   ├── components/     # Reusable UI elements
│   ├── context/        # State management (Auth, Cart, Compare)
│   └── public/         # Static assets
├── backend/            # Express application
│   ├── src/
│   │   ├── models/     # Mongoose models
│   │   ├── routes/     # API endpoints
│   │   ├── config/     # Database & other configs
│   │   └── controllers/# Business logic
└── README.md           # Project documentation
```

## 📝 Giấy phép
Dự án được phát triển bởi NexGen Team.

---
*Cảm ơn bạn đã quan tâm đến NexCore Electronics!*
