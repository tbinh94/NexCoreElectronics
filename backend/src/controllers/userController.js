import User from "../models/User.js";
import Product from "../models/Product.js";

// @desc    Add product to wishlist
// @route   POST /api/users/wishlist
// @access  Private
export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user._id);

        if (!user.wishlist.includes(productId)) {
            user.wishlist.push(productId);
            await user.save();
        }

        res.status(200).json({ message: "Đã thêm vào danh sách yêu thích", wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/users/wishlist/:id
// @access  Private
export const removeFromWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.id);
        await user.save();

        res.status(200).json({ message: "Đã xóa khỏi danh sách yêu thích", wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
};

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("wishlist");
        res.status(200).json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
    }
};
