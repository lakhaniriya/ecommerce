import Product from "../modal/productModal.js";
import Category from "../modal/catagoryModal.js";

// Create Product
export const createProduct = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      stock,
      image,
      category,
    } = req.body;

    if (!title || !description || !price || !stock || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check category exists
    const categoryExist = await Category.findById(category);

    if (!categoryExist) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const product = await Product.create({
      title,
      description,
      price,
      stock,
      image,
      category,
     });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

// Get All Products
export const getAllProducts = async (req, res, next) => {
  try {
    // Query Parameters
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";
    const category = req.query.category || "";
    const sort = req.query.sort || "-createdAt";

    // Build Query
    const query = {};

    // Search by title
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Total products after search/filter
    const totalProducts = await Product.countDocuments(query);

    // Fetch products
    const products = await Product.find(query)
      .populate("category")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      data: products,
    });
  } catch (err) {
    next(err); 
  }
};


export const getProductsByCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const products = await Product.find({ category: id }).populate(
      "category",
      "name image"
    );

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};
// Get Product By Id
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

// Update Product
export const updateProduct = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      stock,
      image,
      category,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check category if updating it
    if (category) {
      const categoryExist = await Category.findById(category);

      if (!categoryExist) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      product.category = category;
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.image = image || product.image;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

// Delete Product
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};