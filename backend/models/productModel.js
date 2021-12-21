const { MaxLength } = require("buffer")
const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({

     name: {
        type: String,
        // required: [true, "Please Enter product Name"],
        // trim: true
    },
    sku:{
        type:String
    },
    description: {
        type: String,
        // required: [true, "Please Enter Product Description"]
    },
    price: {
        type: Number,
        // required: [true, "Please Enter product price"],
        // maxLength: [8, "Price cannot exceed 8 characters"]
    },
    // rating: {
    //     type: Number,
    //     default: 0
    // },
    productImage: {
        type:String,
        // required:true
    },

    
        category:{
            type: mongoose.Types.ObjectId,
             ref: 'Categories' ,
            //  required: true
       },
    
    // stock: {
    //     type: Number,
    //     required: [true, "Please Enter the product stock "],
    //     maxLength: [4, "Stock can not exceed 4 characters"],
    //     default: 1
    // },
    // numOfReviews: {
    //     type: Number,
    //     default: 0
    // },
    // reviews: [{

    //     name: {
    //         type: String,
    //         required: true,
    //     },
    //     rating: {
    //         type: Number,
    //         required: true,
    //     },
    //     comment: {
    //         type: String
    //     }
    // }
   // ],
    // createdAt:{
    //     type:Date,
    //     default:Date.now
    // }


})
const Product = mongoose.model("products", productSchema)
module.exports = Product