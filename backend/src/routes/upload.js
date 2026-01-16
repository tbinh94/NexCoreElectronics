import { Router } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cấu hình Multer để lưu trực tiếp lên Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "nextgen-ecommerce", // Tên thư mục trên Cloudinary
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
    },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
    if (req.file) {
        // Cloudinary trả về đường dẫn ảnh trong req.file.path
        res.send({
            message: "Image uploaded",
            image: req.file.path,
        });
    } else {
        res.status(400).send({ message: "No file uploaded" });
    }
});

export default router;
