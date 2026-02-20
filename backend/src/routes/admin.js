import { Router } from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const router = Router();

router.get("/stats", async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Helper function to calculate percentage change
        const calculateGrowth = (current, previous) => {
            if (previous === 0) return current > 0 ? 100 : 0;
            return ((current - previous) / previous) * 100;
        };

        // 1. Revenue (Sum of totalAmount for completed orders)
        // Today's Revenue
        const revenueTodayAgg = await Order.aggregate([
            {
                $match: {
                    status: "completed",
                    createdAt: { $gte: today, $lt: tomorrow }
                }
            },
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);
        const incomeToday = revenueTodayAgg.length > 0 ? revenueTodayAgg[0].total : 0;

        // Yesterday's Revenue
        const revenueYesterdayAgg = await Order.aggregate([
            {
                $match: {
                    status: "completed",
                    createdAt: { $gte: yesterday, $lt: today }
                }
            },
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);
        const incomeYesterday = revenueYesterdayAgg.length > 0 ? revenueYesterdayAgg[0].total : 0;

        // Total Revenue (All time)
        const totalRevenueAgg = await Order.aggregate([
            { $match: { status: "completed" } },
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);
        const totalRevenue = totalRevenueAgg.length > 0 ? totalRevenueAgg[0].total : 0;

        // 2. Orders
        const ordersToday = await Order.countDocuments({ createdAt: { $gte: today, $lt: tomorrow } });
        const ordersYesterday = await Order.countDocuments({ createdAt: { $gte: yesterday, $lt: today } });
        const totalOrders = await Order.countDocuments({});

        // 3. Products
        const productsToday = await Product.countDocuments({ createdAt: { $gte: today, $lt: tomorrow } });
        const productsYesterday = await Product.countDocuments({ createdAt: { $gte: yesterday, $lt: today } });
        const totalProducts = await Product.countDocuments({});

        // 4. Customers
        const customersToday = await User.countDocuments({ isAdmin: false, createdAt: { $gte: today, $lt: tomorrow } });
        const customersYesterday = await User.countDocuments({ isAdmin: false, createdAt: { $gte: yesterday, $lt: today } });
        const totalCustomers = await User.countDocuments({ isAdmin: false });

        // Calculate Growths
        const revenueGrowth = calculateGrowth(incomeToday, incomeYesterday);
        const ordersGrowth = calculateGrowth(ordersToday, ordersYesterday);
        const productsGrowth = calculateGrowth(productsToday, productsYesterday);
        const customersGrowth = calculateGrowth(customersToday, customersYesterday);

        // 5. Recent Orders
        const recentOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("userId", "name email");

        // 6. Daily Revenue Chart (Last 7 Days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const dailyRevenue = await Order.aggregate([
            {
                $match: {
                    status: "completed",
                    createdAt: { $gte: sevenDaysAgo }
                }

            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    revenue: { $sum: "$totalAmount" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Format chart data (fill missing days)
        const revenueChart = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const dayName = d.toLocaleDateString('vi-VN', { weekday: 'short' }); // "T2", "T3"...

            const found = dailyRevenue.find(item => item._id === dateStr);
            revenueChart.push({
                date: dateStr,
                name: dayName,
                revenue: found ? found.revenue : 0
            });
        }

        res.json({
            revenue: totalRevenue,
            revenueGrowth,
            orders: totalOrders,
            ordersGrowth,
            products: totalProducts,
            productsGrowth,
            customers: totalCustomers,
            customersGrowth,
            recentOrders,
            revenueChart
        });
    } catch (error) {
        console.error("Admin Stats Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// --- PRODUCTS MANAGEMENT ---

// GET /api/admin/products - List all products (admin view)
router.get("/products", async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// GET /api/admin/products/:id - Get single product details
router.get("/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// POST /api/admin/products - Create a new product
router.post("/products", async (req, res) => {
    try {
        const { name, price, description, detailedDescription, highlights, image, category, brand, countInStock, specs } = req.body;
        const product = new Product({
            name,
            price,
            description,
            detailedDescription,
            highlights,
            image,
            category,
            brand,
            countInStock,
            specs,
            isActive: true
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error("Create Product Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// PUT /api/admin/products/:id - Update product
router.put("/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = req.body.name || product.name;
            product.price = req.body.price || product.price;
            product.originalPrice = req.body.originalPrice !== undefined ? req.body.originalPrice : product.originalPrice;
            product.description = req.body.description || product.description;
            product.detailedDescription = req.body.detailedDescription || product.detailedDescription;
            product.highlights = req.body.highlights || product.highlights;
            product.image = req.body.image || product.image;
            product.category = req.body.category || product.category;
            product.brand = req.body.brand || product.brand;
            product.countInStock = req.body.countInStock !== undefined ? req.body.countInStock : product.countInStock;
            product.specs = req.body.specs || product.specs;
            product.is_new_product = req.body.is_new_product !== undefined ? req.body.is_new_product : product.is_new_product;
            product.isActive = req.body.isActive !== undefined ? req.body.isActive : product.isActive;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// DELETE /api/admin/products/:id - Delete product
router.delete("/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: "Product removed" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// --- ORDERS MANAGEMENT ---

// GET /api/admin/orders - List all orders
router.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("userId", "name email")
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// PUT /api/admin/orders/:id/status - Update order status
router.put("/orders/:id/status", async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (updatedOrder) {
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error("Update Order Status Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// --- USERS MANAGEMENT ---

// GET /api/admin/users - List all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// --- NOTIFICATIONS ---
router.get("/notifications", async (req, res) => {
    try {
        // Mock notifications for now, or implement a real notification system
        // In a real app, you'd query a Notification model
        const lowStockProducts = await Product.find({ countInStock: { $lt: 10 } }).select("name countInStock");
        const pendingOrders = await Order.countDocuments({ status: "pending" });

        const notifications = [];

        if (pendingOrders > 0) {
            notifications.push({
                id: "order-1",
                title: "Đơn hàng mới",
                message: `Có ${pendingOrders} đơn hàng đang chờ xử lý`,
                type: "info",
                time: "Vừa xong"
            });
        }

        lowStockProducts.forEach(p => {
            notifications.push({
                id: `stock-${p._id}`,
                title: "Sắp hết hàng",
                message: `Sản phẩm "${p.name}" chỉ còn ${p.countInStock} cái`,
                type: "warning",
                time: "Hôm nay"
            });
        });

        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
