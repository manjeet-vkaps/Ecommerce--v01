const express = require("express")
const { createCategory, getAllCategories,updateCategory, deleteCategory, getCategoryDetails } = require("../controllers/categoryController")
const router = express.Router()

router.post("/category/new",createCategory);
router.get("/categories",getAllCategories) 
router.put("/category/:id",updateCategory)
router.delete("/category/:id",deleteCategory)
router.get("/category/:id",getCategoryDetails)
module.exports = router
