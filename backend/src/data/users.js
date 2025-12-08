// backend/src/data/users.js
import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync("123456", 10), // Mã hóa luôn mật khẩu cho an toàn
        isAdmin: true
    },
];

export default users;