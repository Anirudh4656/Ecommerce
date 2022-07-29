const express = require("express");

const { getAllProducts,createProducts,updateProduct, deleteProduct ,getProductDetails, createProductReview, getProductReviews, deleteReview} =require("../controllers/productController");
const { isAuthenticateUser,authorizedRoles } = require("../middleware/auth");
const router= express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(createProducts);
router.route("/products/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);

router.route("/review").put(isAuthenticateUser,createProductReview);
router.route("/review").get(getProductReviews).delete(isAuthenticateUser,deleteReview);
module.exports= router;