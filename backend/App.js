const express = require("express")
const app = express()
// const errorMiddleware = require("./middleware/error")
const cookieParser = require("cookie-parser");
const Order = require('./models/orderModel');
const path = require('path')
const shortid = require('shortid')
const Razorpay = require('razorpay')
// const cors = require('cors')
// const bodyParser = require('body-parser')


app.use(express.json()) 
app.use(cookieParser());

//Route Imports
const product = require("./routes/productRoute")
const user = require("./routes/userRoute")
const category = require("./routes/categoryRoute")
const order = require("./routes/orderRoute")

app.use("/api/v1", product)
app.use("/api/v1", order)
app.use("/api/v1", user)
app.use("/api/v1",category)
//Middleware for errors
// app.use(errorMiddleware)

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))



app.use(express.json())

// app.use(cors())
// app.use(bodyParser.json())

const razorpay = new Razorpay({
	key_id: 'rzp_test_g7dTFavhwdLIRx',
	key_secret: 'Gp8Bar5JxHvYG2nmH8FPXhvg'
})



app.post('/verification', (req, res) => {
// 	// do a validation
	const secret = '12345678'

	console.log(req.body)

// 	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})

app.post('/razorpay', async (req, res) => {
	const payment_capture = 1
	
	console.log("object",req.body.onlineProduct)
	//const order = await	Order.create(req.body.onlineProduct);
	const options = {
		amount: req.body.onlineProduct.totalPrice,
		currency:"INR",
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount,  
			//currency
		})
	} catch (error) {
		console.log(error)
	}
})

module.exports = app