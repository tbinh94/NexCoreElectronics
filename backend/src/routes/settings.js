import { Router } from "express";
import Settings from "../models/Settings.js";

const router = Router();

// GET /api/settings - Fetch all settings
// For simplicity, we can fetch all settings and return them as an object
router.get("/", async (req, res) => {
    try {
        const settings = await Settings.find({});
        const settingsMap = {};
        settings.forEach(s => {
            settingsMap[s.key] = s.value;
        });

        // Add defaults if they don't exist
        const defaultGeneral = {
            storeName: "NexCore Electronics",
            email: "support@nexcore.com",
            phone: "+84 123 456 789",
            address: "123 Hàm Nghi, Q.1, TP.HCM",
            shippingFee: "30000",
            freeShippingThreshold: "1000000"
        };

        if (!settingsMap["general"]) {
            settingsMap["general"] = defaultGeneral;
        }

        res.json(settingsMap);
    } catch (error) {
        console.error("Fetch Settings Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// PUT /api/settings - Update settings
router.put("/", async (req, res) => {
    try {
        const { key, value } = req.body;
        
        let setting = await Settings.findOne({ key });
        if (setting) {
            setting.value = value;
            await setting.save();
        } else {
            setting = new Settings({ key, value });
            await setting.save();
        }

        res.json(setting);
    } catch (error) {
        console.error("Update Setting Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
