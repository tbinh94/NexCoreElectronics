// backend/src/data/users.js
import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync("123456", 10), // Mã hóa luôn mật khẩu cho an toàn
        isAdmin: true
    },
    {
        name: "Nguyễn Văn An",
        email: "an.nguyen@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false
    },
    {
        name: "Trần Thị Bích",
        email: "bich.tran@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false
    },
    {
        name: "Lê Hoàng Nam",
        email: "nam.le@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false
    },
    {
        name: "Phạm Minh Tuấn",
        email: "tuan.pham@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false
    },
    {
        name: "Hoàng Thị Mai",
        email: "mai.hoang@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false
    },
    {
        name: "Vũ Đức Thắng",
        email: "thang.vu@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false
    },
    {
        name: "Đặng Thu Hà",
        email: "ha.dang@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false
    },
    {
        name: "Bùi Văn Long",
        email: "long.bui@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false
    },
    {
        name: "Đỗ Thị Lan",
        email: "lan.do@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: false
    }
];

export default users;