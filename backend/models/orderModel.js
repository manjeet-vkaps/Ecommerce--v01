const mongoose =  require('mongoose')

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        itemTotal: { type: String, required: true },
        // sku: { type: String, required: true },
        description: { type: String, required: true },
        productImage : {type : String}
      },
    ],
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: Number, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      // required: true,
    },
    
    totalPrice: {
      type: Number,
      // required: true,
      default: 0.0,
    },
    
    paymentResult : {
      paymentID:{type:String}, 
      orderID:{type : String}, 
      sign:{type : String}

    },
    
  },{ timestamps: true })

const Order = mongoose.model('Order', orderSchema)

module.exports = Order