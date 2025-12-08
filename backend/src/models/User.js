import mongoose from "mongoose";

// Định nghĩa các cột (fields)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
}, {
    timestamps: true // Tự động thêm ngày tạo/sửa
});

// Tạo Model (tương ứng với Table 'users' trong DB)
const User = mongoose.model("User", userSchema);

export default User;