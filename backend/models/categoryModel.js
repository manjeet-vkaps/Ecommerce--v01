// const { MaxLength } = require("buffer")
const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema( {
    catName: {
        type: String,
       
    },
    
});
module.exports = mongoose.model("Categories", categorySchema)
