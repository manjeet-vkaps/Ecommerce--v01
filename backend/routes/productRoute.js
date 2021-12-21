const express = require("express")
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, getProductDetailsAndId } = require("../controllers/productController")
const { isAuthenticatedUser ,authorizeRoles} = require("../middleware/auth")
const catchAsyncErrors = require("../middleware/catchAsyncErorrs")

const router = express.Router()

const sharp=require("sharp");
const multer =require('multer');
const path =require("path");

const fs=require('fs');
 
const product = require("../models/productModel")
const category = require("../models/categoryModel");

const storage=multer.memoryStorage()
const upload = multer({storage});






// const storage =multer.diskStorage({
//   destination:function(req,file,cb){
//       cb(null,'./uploads');
//   },
//   filename:function(req,file,cb){
//     cb(null,new Date().toISOString() + file.originalname);
//   }
// })

// const fileFilter =(req,file,cb)=>{
//   if(file.mimetype ==='image/jpeg'  || file.mimetype ==='image/png'){
//     cb(null,true)
//   }else{
//     cb(null,false)
//   }
// }

// const upload = multer({
//   storage:storage,
//   limits:{
//   fileSize:1024 * 1024 * 5
//   },
//   fileFilter:fileFilter  
// });


router.get("/users", (req, res) => {
  res.send("Hello from the user side");
});

// router.post('/productdata', async (req, res) => {
//     try {
//         const pro = new product(req.body);
//         const Addproduct = await pro.save()
//         res.status(201).send(Addproduct);
//     } catch (e) { 
//         res.status(400).send(e)
//     }

// }) 

// router.post("/product/new", upload.single('productImage') ,async function (req, res) {
  

//   // const {name,sku,price,category,description} = req.body;
//   // console.log("req.file",req.file)
//   // console.log("req.body",req.body)

//   const newProduct = await product.create({...req.body, productImage:req.file.path});

//   await category.updateMany(
//     { _id: newProduct.category },
//     { $push: { products: newProduct._id } }
//   );


//   return res.send(newProduct)
// });


router.post("/product/new", upload.single('productImage') ,async function (req, res) {
  // const {name,sku,price,category,description} = req.body;
  console.log("req.file",req.file)
  console.log("req.body",req.body)

  fs.access('uploads',(err)=>{
    if(err){
      fs.mkdirSync('/uploads')
    }
  })

  const date= new Date();
  await sharp(req.file.buffer)
  .resize({width:400,height:400})
  .toFile(`uploads/${date.getTime()}${
        req.file.originalname
      }`);
  
  const newProduct = await product.create({...req.body, productImage:`uploads/${date.getTime()}${
        req.file.originalname
      }`});
  
  await category.updateMany(
    { _id: newProduct.category },
    { $push: { products: newProduct._id } }
  );
  return res.send(newProduct);
});

      
   

//get all productw
// router
// .route("/products")
// .get( getAllProducts,getProductDetailsAndId);

router.get("/products", async (req, res) => {
  try {
    let searchQuery = ''

    if (req.query.keyword) {
      searchQuery = String(req.query.keyword)
    }

    // for category filter
    if (req.query.category) {
      let categoryQuery = req.query.category
      const findQuery = {
        $and: [
          { category: categoryQuery },
          {
            $or: [
              { name: { $regex: searchQuery, $options: 'i' } },
              { description: { $regex: searchQuery, $options: 'i' } },
            ],
          },
        ],
      }
      const results = await product.find(findQuery)

      const products = await product.find(findQuery)
        .sort('-createdAt')
        // .populate('category', 'title')
        .limit(parseInt(req.query.limit))
        .skip(parseInt(req.query.skip))

      return res.json({ success: true, totalResults: results.length, products })
    }

    const findQuery = {
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
      ],
    }

    const results = await product.find(findQuery)

    const products = await product.find(findQuery)
      .sort('-createdAt')
      // .populate('category', 'title')
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))

    return res.json({ success: true, totalResults: results.length, products })
  }  catch (e) {
    console.log(e)
    res.status(400).json({ success: false, error: e.message })
  }
});



//prduct delete update get a single product 
router
  .route("/product/:id")
  .put( updateProduct)
  .delete( deleteProduct);

router.route("/product/:id").get(getProductDetails);


router.patch(
  "/updateimage/:id",
  upload.single("productImage"),
  async (req, res) => {
    const date = new Date();
    try {
      const producta = await product.findById(req.params.id);
      console.log("req.file", req.file);

      if (!producta) {
        return res
          .status(404)
          .json({ success: false, error: "Product not found" });
      }

      if (!req.file) throw new Error("please upload an image");
      fs.access("uploads", (err) => {
        if (err) {
          fs.mkdirSync("/uploads");
        }
      });
      console.log(producta.productImage)
      fs.unlinkSync(path.resolve(producta.productImage));

      await sharp(req.file.buffer)
        .resize({ width: 400, height: 400 })
        .toFile(`uploads/${date.getTime()}${req.file.originalname}`);

      producta.productImage = `uploads/${date.getTime()}${
        req.file.originalname
      }`;
      await producta.save();
      res.json({
        success: true,
        message: "Image updated",
        image: producta.productImage,
      });
    } catch (err) {
      if (req.file) {
        fs.unlinkSync(
          path.resolve(`/uploads/${date.getTime()}${req.file.originalname}`)
        );
      }
      res.status(400).json({ success: false, error: err.message });
    }
  }
);



module.exports = router