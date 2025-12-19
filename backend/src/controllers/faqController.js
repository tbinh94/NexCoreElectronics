import Faq from "../models/Faq.js";

export const getFaq = async (req, res) => {
    try {
        const faq = await Faq.find();
        res.status(200).json(faq);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createFaq = async (req, res) => {
    try {
        const faq = await Faq.create(req.body);
        res.status(201).json(faq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}