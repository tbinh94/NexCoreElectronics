import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
import TradeInRequest from "../models/TradeInRequest.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const estimateLaptopValue = async (req, res) => {
    try {
        console.log("Valuation request received");
        const { modelCode, modelName, specs, operationStatus, repairHistory, yearsUsed, fanNoise, batteryLife, overheating } = req.body;
        const files = req.files;
        console.log("Files received:", files ? files.length : 0);

        // Allow 1 image (stitched) or 2+ images (individual)
        if (!files || (files.length < 2 && files.length !== 1)) {
            return res.status(400).json({ message: "Vui lòng tải lên ít nhất 2 ảnh hoặc 1 ảnh ghép." });
        }

        // Prepare images for Gemini
        const imageParts = files.map(file => {
            const imageBuffer = fs.readFileSync(file.path);
            return {
                inlineData: {
                    data: imageBuffer.toString("base64"),
                    mimeType: file.mimetype,
                },
            };
        });

        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
        Bạn là một CHUYÊN GIA THẨM ĐỊNH GIÁ LAPTOP CŨ tại thị trường Việt Nam,
        có kinh nghiệm thực tế trong thu mua, trade-in và tân trang laptop.

        MỤC TIÊU:
        - Định giá CHÍNH XÁC, THẬN TRỌNG và THỰC TẾ.
        - Ưu tiên KHOẢNG GIÁ AN TOÀN hơn là một con số đẹp.
        - KHÔNG được bịa giá, KHÔNG được giả vờ truy cập internet.

        LƯU Ý QUAN TRỌNG:
        - Hình ảnh có thể là 2 - 4 ảnh RIÊNG LẺ hoặc 1 ảnh GHÉP → hãy quan sát toàn bộ.
        - Nếu thiếu dữ liệu, hãy hạ mức độ tin cậy và phản ánh rõ trong kết quả.
        - Giá đưa ra là GIÁ THU MUA (trade-in), KHÔNG phải giá bán lẻ.

        -------------------------
        THÔNG TIN MÁY (DO NGƯỜI DÙNG CUNG CẤP)
        -------------------------
        - Tên máy: ${modelName}
        - Mã máy (Model Code): ${modelCode}
        - Cấu hình (có thể không đầy đủ): ${specs}
        - Tình trạng hoạt động: ${operationStatus}
        - Lịch sử sửa chữa: ${repairHistory}
        - Thời gian đã sử dụng: ${req.body.yearsUsed || "Không rõ"} năm

        Thông tin bổ sung:
        - Quạt: ${fanNoise || "Không rõ"}
        - Pin: ${batteryLife || "Không rõ"}
        - Nhiệt độ khi dùng: ${overheating || "Không rõ"}

        -------------------------
        HƯỚNG DẪN PHÂN TÍCH (BẮT BUỘC TUÂN THEO)
        -------------------------

        1. XÁC ĐỊNH CẤU HÌNH CHUẨN
        - Nếu cấu hình người dùng cung cấp thiếu hoặc không rõ:
        → Dựa vào TÊN MÁY + MÃ MÁY để suy luận cấu hình phổ biến nhất của model đó tại Việt Nam.
        - KHÔNG được suy đoán cấu hình cao hơn thực tế.

        2. ĐÁNH GIÁ NGOẠI HÌNH QUA ẢNH
        - Phân tích kỹ:
        + Trầy xước (nhẹ / nhiều)
        + Cấn móp
        + Bóng phím / mòn touchpad
        + Hở viền / cong nắp
        - Chỉ kết luận những gì NHÌN THẤY ĐƯỢC.

        3. ĐÁNH GIÁ TÌNH TRẠNG HOẠT ĐỘNG (RẤT QUAN TRỌNG)
        - Nếu "Không lên nguồn": coi là XÁC MÁY.
        - Nếu "Có lỗi nhẹ": trừ giá theo mức độ ảnh hưởng sử dụng.
        - Nếu đã sửa main hoặc màn hình: coi là máy KHÔNG ZIN → trừ mạnh.

        4. PHÂN TÍCH RỦI RO SỬ DỤNG
        - Dựa trên:
        + Tuổi đời model và THỜI GIAN ĐÃ SỬ DỤNG (${req.body.yearsUsed || "?"} năm).
        + Pin, quạt, nhiệt độ
        - Máy dùng > 3 năm: Rủi ro trung bình/cao (Pin/SSD có thể kém).
        - Máy dùng > 5 năm: Rủi ro cao.
        - Ước lượng rủi ro hỏng trong 6–12 tháng tới (thấp / trung bình / cao).

        5. ƯỚC LƯỢNG GIÁ THỊ TRƯỜNG (KHÔNG SEARCH)
        - Dựa trên:
        + Phân khúc (cao cấp / tầm trung / phổ thông)
        + Cấu hình
        + Độ mất giá trung bình laptop tại VN
        - Nếu không chắc chắn → đưa RA KHOẢNG GIÁ.

        6. TÍNH GIÁ THU MUA (TRADE-IN)
        - Giá thu = giá thị trường * (45% → 70%) tuỳ thuộc vào ngoại hình (Grade) và THỜI GIAN SỬ DỤNG:
          + Grade A (Như mới, dùng < 1 năm): 65% - 70%
          + Grade B (Xước nhẹ, dùng 1-3 năm): 55% - 65%
          + Grade C (Cấn/Xước nhiều, dùng > 3 năm): 45% - 55%
          + Grade D (Xấu/Lỗi): < 45%
        - Trừ thêm:
        + Lỗi phần cứng
        + Rủi ro hỏng sớm (đặc biệt nếu dùng lâu)
        - Mỗi khoản trừ PHẢI được giải thích.

        -------------------------
        BƯỚC 0: KIỂM TRA ĐỐI TƯỢNG (QUAN TRỌNG NHẤT)
        - Quan sát kỹ hình ảnh.
        - Nếu hình ảnh KHÔNG PHẢI LÀ LAPTOP (ví dụ: điện thoại, xe cộ, động vật, người, hoặc vật dụng khác...), 
          HÃY DỪNG NGAY VÀ TRẢ VỀ JSON SAU:
          {
            "error": "NOT_A_LAPTOP",
            "message": "Hình ảnh bạn cung cấp có vẻ không phải là laptop. Vui lòng kiểm tra lại."
          }
        -------------------------

        -------------------------
        YÊU CẦU ĐẦU RA (JSON ONLY – KHÔNG THÊM CHỮ)
        -------------------------
        Nếu là laptop, trả về:
        {
        "condition_grade": "A | B | C | D",
        "condition_details": "Mô tả ngắn gọn nhưng cụ thể về ngoại hình và tình trạng máy dựa trên ảnh",
        "market_price_estimate": {
            "low": số_nguyên_vnđ,
            "high": số_nguyên_vnđ
        },
        "trade_in_value": {
            "recommended": số_nguyên_vnđ,
            "safe_min": số_nguyên_vnđ
        },
        "risk_assessment": "Thấp | Trung bình | Cao",
        "confidence_level": "Cao | Trung bình | Thấp",
        "reasoning": "Giải thích rõ ràng, có logic từng bước vì sao ra mức giá này"
        }

        QUY TẮC CUỐI:
        - Không chắc → hạ confidence.
        - Không đủ ảnh → phản ánh trong giá.
        - Thà định giá thấp an toàn còn hơn cao nhưng sai.

        `;

        const result = await model.generateContent([prompt, ...imageParts]);
        const responseText = result.response.text();

        // Robust JSON extraction
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("Invalid response format from AI");
        }
        const jsonString = jsonMatch[0];
        const valuation = JSON.parse(jsonString);

        // Clean up uploaded files
        files.forEach(file => {
            if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        });

        res.json(valuation);

    } catch (error) {
        console.error("Valuation Error:", error);
        // Clean up files on error
        if (req.files) {
            req.files.forEach(file => {
                if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
            });
        }
        res.status(500).json({ message: "Failed to estimate value", error: error.message });
    }
};

export const saveTradeInRequest = async (req, res) => {
    try {
        const { deviceInfo, valuationResult, contactInfo } = req.body;
        const userId = req.user._id;

        const newRequest = new TradeInRequest({
            userId,
            deviceInfo,
            valuationResult,
            contactInfo
        });

        await newRequest.save();
        res.status(201).json({ message: "Yêu cầu đã được gửi thành công. Nhân viên sẽ liên hệ với bạn sớm nhất có thể.", request: newRequest });
    } catch (error) {
        console.error("Save Trade-In Request Error:", error);
        res.status(500).json({ message: "Lỗi khi lưu yêu cầu", error: error.message });
    }
};
