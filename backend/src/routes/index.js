import { Router } from "express";
import Product from "../models/Product.js";
import authRoutes from "./auth.js";
import cartRoutes from "./cart.js";

const router = Router();
router.use("/cart", cartRoutes);
router.use("/auth", authRoutes);

router.get("/products", async (req, res) => {
  try {
    const { limit = 12, page = 1, category, brand, minPrice, maxPrice, sort } = req.query;
    const limitNum = Number(limit);
    const pageNum = Number(page);
    const skip = (pageNum - 1) * limitNum;

    // Build filter object
    const filter = {};
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };

    // Create query with filters
    const productsQuery = Product.find(filter);

    // Apply sorting
    if (sort) {
      if (sort === 'price_asc') {
        productsQuery.sort({ price: 1 });
      } else if (sort === 'price_desc') {
        productsQuery.sort({ price: -1 });
      } else if (sort === 'newest') {
        productsQuery.sort({ createdAt: -1 });
      }
    }

    // Apply pagination
    productsQuery.skip(skip).limit(limitNum);

    // Execute query and count total
    const [products, total] = await Promise.all([
      productsQuery.exec(),
      Product.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalPages,
        totalProducts: total
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/products/filters", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    const brands = await Product.distinct("brand");
    res.json({ categories, brands });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
})



export default router;
