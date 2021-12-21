const Product = require("../models/productModel")
const Category = require("../models/categoryModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErorrs")
const ApiFeatures = require("../utils/apiFeatures")
// const multer = require("multer")

//Create Product
// exports.createProduct = catchAsyncErrors(
//     async (req, res, next) => {
//         const product = await Product.create(req.body)

//         res.status(201).json({
//             success: true,
//             product
//         })
//     }
// )



// Create Product
// exports.createProduct = async (req, res) => {
//     try {
//       if (!req.file) throw new Error('please upload an image')
//     //   const { filename: image } = req.file
  
//     //   await sharp(req.file.path)
//     //     .resize({ width: 400, height: 400 })
//     //     .toFile(path.resolve(req.file.destination, '', `resized-${image}`))
//     //   fs.unlinkSync(req.file.path)
  
//       const product = new Product({
//         ...req.body,
//         productImage: req.file.path,
//       })
//       await product.save()
//       res.status(201).json({ success: true, message: 'product added', product })
//     } catch (err) {
//     //   if (req.file) {
//     //     const { filename: image } = req.file
//     //     fs.unlinkSync(path.resolve(req.file.destination, '', `resized-${image}`))
//     //   }
//       res.status(400).json({ error: err.message })
//     }
//   }
    

//get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 10
    const productCount = Product.countDocuments()

    const apiFeature = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage)
    const products = await apiFeature.query

    res.status(200).json({
        success: true,
        products,
        
    })
})

//get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        product
    })
})


//update product -- admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})

//delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id)


    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "product deleted succesfully"
    })
})

//get product details
exports.getProductDetailsAndId = catchAsyncErrors(async (req, res, next) => {

    if(req.query.category){
        const studentsdata = await Product.find({ category: req.query.category })
        return res.status(200).send(studentsdata)
      }
    const studentsdata = await Product.find({});
    res.send(studentsdata);

})

//product by id

// router.get("/products", async (req, res) => {
//     try {
//         if(req.query.category){
//           const studentsdata = await product.find({ category: req.query.category })
//           return res.status(200).send(studentsdata)
//         }
//       const studentsdata = await product.find({});
//       res.send(studentsdata);
//     } catch (e) {
//       res.send(e);
//     }
//   });