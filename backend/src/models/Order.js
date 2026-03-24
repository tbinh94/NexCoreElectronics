import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        phone: { type: String, required: true }
    },
    cccd: {
        type: String,
        validate: {
            validator: function (v) {
                return !v || /^\d{12}$/.test(v);
            },
            message: props => `${props.value} is not a valid 12-digit CCCD!`
        }
    },
    estimatedDeliveryDate: {
        type: Date
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["cash", "card", "transfer", "installment"]
    },
    status: {
        type: String,
        enum: ["pending", "processing", "shipping", "completed", "cancelled", "đang trả góp", "đã trả góp xong"],
        default: "pending"
    }
}, {
    timestamps: true
});

export default mongoose.model("Order", orderSchema);
