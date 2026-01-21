import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            required: false,
        },
        category: {
            type: String,
            required: true,
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
        originalPrice: {
            type: Number,
            required: false,
        },
        rating: {
            type: Number,
            required: false,
            default: 0,
        },
        reviews: {
            type: Number,
            required: false,
            default: 0,
        },
        is_new_product: {
            type: Boolean,
            required: false,
            default: false,
        },
        highlights: {
            type: [String],
            required: false,
        },
        detailedDescription: {
            type: String,
            required: false,
        },
        specs: {
            cpu: { type: String },
            ram: { type: String },
            storage: { type: String },
            screen: { type: String },
            gpu: { type: String },
            battery: { type: String },
            weight: { type: String },
            os: { type: String },
        },
        brand: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        usage: {
            type: [String],
            required: false,
        },
        cpu_type: {
            type: String,
            required: false,
        },
        screen_size_label: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
