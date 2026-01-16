import Category from "../models/Category.js";

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const slug = name.toLowerCase().split(" ").join("-");

        const categoryExists = await Category.findOne({ name });

        if (categoryExists) {
            return res.status(400).json({ message: "Category already exists" });
        }

        const category = await Category.create({
            name,
            slug,
            description,
            image,
        });

        if (category) {
            res.status(201).json(category);
        } else {
            res.status(400).json({ message: "Invalid category data" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
    try {
        console.log("Fetching categories...");
        // console.log("DB State:", mongoose.connection.readyState); 
        // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting

        const categories = await Category.find({});
        console.log("Categories fetched:", categories.length);
        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (category) {
            await category.deleteOne();
            res.json({ message: "Category removed" });
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
