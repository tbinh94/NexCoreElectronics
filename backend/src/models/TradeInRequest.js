import mongoose from "mongoose";

const tradeInRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    deviceInfo: {
        modelName: { type: String, required: true },
        modelCode: { type: String, required: true },
        specs: { type: String, required: true },
        operationStatus: { type: String },
        repairHistory: { type: String },
        yearsUsed: { type: Number },
    },
    valuationResult: {
        condition_grade: { type: String },
        trade_in_value: {
            recommended: { type: Number },
            safe_min: { type: Number }
        }
    },
    contactInfo: {
        phone: { type: String, required: true },
        address: { type: String, required: true }
    },
    status: {
        type: String,
        enum: ["pending", "contacted", "completed", "cancelled"],
        default: "pending"
    }
}, {
    timestamps: true
});

export default mongoose.model("TradeInRequest", tradeInRequestSchema);
