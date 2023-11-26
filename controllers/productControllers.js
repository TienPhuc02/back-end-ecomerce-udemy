import product from "../models/product.js";

//get all product -> /api/v1/products
export const getAllProducts = async (req, res) => {
  const allProducts = await product.find();
  res.status(200).json({
    message: "Get All Products Success",
    allProducts,
  });
};

//create new product -> /api/v1/products
export const createNewProducts = async (req, res) => {
  const newProducts = await product.create(req.body);
  res.status(200).json({
    message: "Create New  Products Success",
    newProducts,
  });
};

//get product details -> /api/v1/products/:id
export const getProductsDetail = async (req, res) => {
  console.log(req.params)
  const getProductDetails = await product.findById(req?.params?.id);
  if(!getProductDetails){
    res.status(404).json({
      message:" Product not found"
    })
  }
  res.status(200).json({
    message: "Get  Products Details Success",
    getProductDetails,
  });
};
