const Category = require("../models/categoryModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErorrs")
const ApiFeatures = require("../utils/apiFeatures")

//Create Category
exports.createCategory = async(req,res,next)=>{
    const category = await  Category.create(req.body);

    res.status(200).json({
        succes : true,
        category
    })
}
//get all categories
exports.getAllCategories = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 10
    const categoryCount = Category.countDocuments()

    const apiFeature = new ApiFeatures(Category.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage)
    const categories = await apiFeature.query

    res.status(200).json({
        success: true,
        categories,
        
    })
})

//update category -- admin
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
    let category = await Category.findById(req.params.id)

    if (!category) {
        return next(new ErrorHandler("Category not found", 404))
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        category
    })
})

//delete product
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {

    const category = await Category.findById(req.params.id)


    if (!category) {
        return next(new ErrorHandler("category not found", 404))
    }

    await category.remove();

    res.status(200).json({
        success: true,
        message: "category deleted succesfully"
    })
})

//get category details
exports.getCategoryDetails = catchAsyncErrors(async (req, res, next) => {

    const category = await Category.findById(req.params.id)

    if (!category) {
        return next(new ErrorHandler("category not found", 404))
    }

    res.status(200).json({
        success: true,
        category
    })
})