import React, { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'

import { useCart } from 'react-use-cart';
import axios from 'axios';

const Checkout = () => {

  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    email:""
  })

  const [orderItems, setOrderItems] = useState([])

  const [paymentMethod, setPaymentMethod] = useState('')
   console.log("razor",paymentMethod);
  const handleChange = e => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value })
  }
  


  const history = useNavigate()
  const placeOrder = async (
    user,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    paymentResult
  ) => {
    const productBody ={
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentResult
    }
    try {
      // const userToken = JSON.parse(localStorage.getItem('userToken'))
      // const headers = {
      //   Authorization: `Bearer ${userToken && userToken}`,
      // }
      await axios.post('/api/v1/order/new', productBody)
          history("/thankyou")
          // window.alert("order placed")

    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    const newArr = items.map(
      ({ category, createdAt, id, updatedAt, __v, _id, ...keep }) => keep
    )

    setOrderItems(newArr)
    // eslint-disable-next-line
  }, [])
  //  console.log("oreder",orderItems);

  const handlePlaceOrder = () => {

    const userid = JSON.parse(localStorage.getItem("user"))._id;
    console.log("userid",userid);
    console.log('place order',orderItems, shippingAddress, paymentMethod, cartTotal)
    if(paymentMethod === "cod"){
      placeOrder(userid, orderItems, shippingAddress, paymentMethod, cartTotal)
    }
    else {
      console.log("object");
      displayRazorpay( cartTotal )
    }
     
  }
   
  

  
  // console.log("logu",cart);

  const {
    isEmpty,
    totalItems,
    totalUniqueItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
    items,
  } = useCart();
  
  

  //Payment Method Razorpay
 const displayRazorpay = async(
   
    
    totalPrice,
    
  ) =>{

    

    const onlineProduct = {
     
    totalPrice,
    
    }
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
        
      );
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
      const userid = JSON.parse(localStorage.getItem("user"))._id;
      const {data} = await axios.post("/razorpay",{onlineProduct});
        console.log("razorpaydat",data);
            history("/thankyou")
        // window.alert("order placed successfully")

      const options = {
        key: "rzp_test_g7dTFavhwdLIRx", // Enter the Key ID generated from the Dashboard
        amount: Number(cartTotal) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: data.currency,
        order_id: data.id,
        name: "Shoppers",
        description: "Test Transaction",
        image: "https://image.freepik.com/free-vector/logo-sample-text_355-558.jpg",
       
        //This is a sample Order ID. Pass the id obtained in the response of Step 1
        handler: function (response) {
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
          placeOrder(userid, 
            orderItems,
            shippingAddress,
            paymentMethod,
            cartTotal,
            {paymentID:response.razorpay_payment_id, orderID:response.razorpay_order_id, sign:response.razorpay_signature} )
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      function loadScript(src) {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
    
          script.onload = () => {
            resolve(true);
          
      
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      }
    }
  

    
    catch (err) {
      console.log(err.message)
    }
  }
 

  
   
  


 


    return (
        <div className="site-wrap">
     
        <div className="bg-light py-3">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mb-0"><a href="index.html">Home</a> <span className="mx-2 mb-0">/</span> <a href="cart.html">Cart</a> <span className="mx-2 mb-0">/</span> <strong className="text-black">Checkout</strong></div>
            </div>
          </div>
        </div>
        <div className="site-section">
          <div className="container">
            <div className="row mb-5">
              <div className="col-md-12">
                <div className="border p-4 rounded" role="alert">
                  Returning customer? <a href="#">Click here</a> to login
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-5 mb-md-0">
                <h2 className="h3 mb-3 text-black">Billing Details</h2>
                <div className="p-3 p-lg-5 border">
                  {/* <div className="form-group">
                    <label htmlFor="c_country" className="text-black">Country <span className="text-danger">*</span></label>
                    <select id="c_country" className="form-control">
                      <option value={1}>Select a country</option>    
                      <option value={2}>bangladesh</option>    
                      <option value={3}>Algeria</option>    
                      <option value={4}>Afghanistan</option>    
                      <option value={5}>Ghana</option>    
                      <option value={6}>Albania</option>    
                      <option value={7}>Bahrain</option>    
                      <option value={8}>Colombia</option>    
                      <option value={9}>Dominican Republic</option>    
                    </select>
                  </div> */}
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="name" className="text-black"> Name <span className="text-danger">*</span></label>
                      <input 
                      type="text" 
                      className="form-control" 
                      id="name" 
                      name="name" 
                      value={shippingAddress.name}
                      onChange={handleChange}
                      />
                    </div>
                    
                  </div>
                 
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="address" className="text-black">Address <span className="text-danger">*</span></label>
                      <input type="text" 
                      className="form-control" 
                      id="address" 
                      name="address"
                      value={shippingAddress.address}
                      onChange={handleChange}
                      placeholder="Street address" />
                    </div>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Apartment, suite, unit etc. (optional)" />
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="country" className="text-black"> Country <span className="text-danger">*</span></label>
                      <input type="text" 
                      className="form-control" 
                      id="country" 
                      name="country" 
                      value={shippingAddress.country}
                      onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="city" className="text-black">City <span className="text-danger">*</span></label>
                      <input type="text" 
                      className="form-control" 
                      id="city" 
                      name="city" 
                      value={shippingAddress.city}
                      onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="postalCode" className="text-black">Posta / Zip <span className="text-danger">*</span></label>
                      <input type="number" 
                      className="form-control" 
                      id="postalCode" 
                      name="postalCode" 
                      value={shippingAddress.postalCode}
                      onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-5">
                    <div className="col-md-6">
                      <label htmlFor="email" className="text-black">Email Address <span className="text-danger">*</span></label>
                      <input type="text" 
                      className="form-control" 
                      id="email" 
                      name="email"  
                      value={shippingAddress.email}
                      onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="phone" className="text-black">Phone <span className="text-danger">*</span></label>
                      <input type="number" 
                      className="form-control" 
                      id="phone" 
                      name="phone" 
                      placeholder="Phone Number" 
                      value={shippingAddress.phone}
                      onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="c_create_account" className="text-black" data-toggle="collapse" href="#create_an_account" role="button" aria-expanded="false" aria-controls="create_an_account"><input type="checkbox" defaultValue={1} id="c_create_account" /> Create an account?</label>
                    <div className="collapse" id="create_an_account">
                      <div className="py-2">
                        <p className="mb-3">Create an account by entering the information below. If you are a returning customer please login at the top of the page.</p>
                        <div className="form-group">
                          <label htmlFor="c_account_password" className="text-black">Account Password</label>
                          <input type="email" className="form-control" id="c_account_password" name="c_account_password" placeholder />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="c_ship_different_address" className="text-black" data-toggle="collapse" href="#ship_different_address" role="button" aria-expanded="false" aria-controls="ship_different_address"><input type="checkbox" defaultValue={1} id="c_ship_different_address" /> Ship To A Different Address?</label>
                    <div className="collapse" id="ship_different_address">
                      <div className="py-2">
                        <div className="form-group">
                          <label htmlFor="c_diff_country" className="text-black">Country <span className="text-danger">*</span></label>
                          <select id="c_diff_country" className="form-control">
                            <option value={1}>Select a country</option>    
                            <option value={2}>bangladesh</option>    
                            <option value={3}>Algeria</option>    
                            <option value={4}>Afghanistan</option>    
                            <option value={5}>Ghana</option>    
                            <option value={6}>Albania</option>    
                            <option value={7}>Bahrain</option>    
                            <option value={8}>Colombia</option>    
                            <option value={9}>Dominican Republic</option>    
                          </select>
                        </div>
                        <div className="form-group row">
                          <div className="col-md-6">
                            <label htmlFor="c_diff_fname" className="text-black">First Name <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" id="c_diff_fname" name="c_diff_fname" />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="c_diff_lname" className="text-black">Last Name <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" id="c_diff_lname" name="c_diff_lname" />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-md-12">
                            <label htmlFor="c_diff_companyname" className="text-black">Company Name </label>
                            <input type="text" className="form-control" id="c_diff_companyname" name="c_diff_companyname" />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-md-12">
                            <label htmlFor="c_diff_address" className="text-black">Address <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" id="c_diff_address" name="c_diff_address" placeholder="Street address" />
                          </div>
                        </div>
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Apartment, suite, unit etc. (optional)" />
                        </div>
                        <div className="form-group row">
                          <div className="col-md-6">
                            <label htmlFor="c_diff_state_country" className="text-black">State / Country <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" id="c_diff_state_country" name="c_diff_state_country" />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="c_diff_postal_zip" className="text-black">Posta / Zip <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" id="c_diff_postal_zip" name="c_diff_postal_zip" />
                          </div>
                        </div>
                        <div className="form-group row mb-5">
                          <div className="col-md-6">
                            <label htmlFor="c_diff_email_address" className="text-black">Email Address <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" id="c_diff_email_address" name="c_diff_email_address" />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="c_diff_phone" className="text-black">Phone <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" id="c_diff_phone" name="c_diff_phone" placeholder="Phone Number" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="c_order_notes" className="text-black">Order Notes</label>
                    <textarea name="c_order_notes" id="c_order_notes" cols={30} rows={5} className="form-control" placeholder="Write your notes here..." defaultValue={""} />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row mb-5">
                  <div className="col-md-12">
                    <h2 className="h3 mb-3 text-black">Coupon Code</h2>
                    <div className="p-3 p-lg-5 border">
                      <label htmlFor="c_code" className="text-black mb-3">Enter your coupon code if you have one</label>
                      <div className="input-group w-75">
                        <input type="text" className="form-control" id="c_code" placeholder="Coupon Code" aria-label="Coupon Code" aria-describedby="button-addon2" />
                        <div className="input-group-append">
                          <button className="btn btn-primary btn-sm" type="button" id="button-addon2">Apply</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-md-12">
                    <h2 className="h3 mb-3 text-black">Your Order</h2>
                    <div className="p-3 p-lg-5 border">
                      <table className="table site-block-order-table mb-5">
                        <thead>
                          <tr><th>Product</th>
                            <th>Total</th>
                          </tr></thead>
                        <tbody>
                          {items.map((data)=>{
                            return(
                            <>
                          <tr>
                            <td>{data.name} <strong className="mx-2">x</strong> {data.quantity}</td>
                            <td>${data.quantity * data.price}</td>
                          </tr>
                       
                         
                          </>
                          )
                          })}
                           <tr>
                            <td className="text-black font-weight-bold"><strong>Cart Subtotal</strong></td>
                            <td className="text-black">${cartTotal}</td>
                          </tr>
                          <tr>
                            <td className="text-black font-weight-bold"><strong>Order Total</strong></td>
                            <td className="text-black font-weight-bold"><strong>${cartTotal}</strong></td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="form-group my-5">
                      <label className="text-black">
                        Payment Method <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-control"
                        name="paymentMethod"
                        onChange={e => setPaymentMethod(e.target.value)}>
                        <option >Select</option>
                         
                        <option value="cod">Cash On delivery</option>
                        <option value="razorpay">Razorpay</option>
                        
                      </select>
                    </div>
                      <div className="form-group">
                        <button onClick={handlePlaceOrder} className="btn btn-primary btn-lg py-3 btn-block">Place Order</button>
                      </div>
                      <div className="form-group">
                        <button onClick={handlePlaceOrder} className="btn btn-primary btn-lg py-3 btn-block">RazorPAY</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
        <footer className="site-footer border-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="footer-heading mb-4">Navigations</h3>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <ul className="list-unstyled">
                      <li><a href="#">Sell online</a></li>
                      <li><a href="#">Features</a></li>
                      <li><a href="#">Shopping cart</a></li>
                      <li><a href="#">Store builder</a></li>
                    </ul>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <ul className="list-unstyled">
                      <li><a href="#">Mobile commerce</a></li>
                      <li><a href="#">Dropshipping</a></li>
                      <li><a href="#">Website development</a></li>
                    </ul>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <ul className="list-unstyled">
                      <li><a href="#">Point of sale</a></li>
                      <li><a href="#">Hardware</a></li>
                      <li><a href="#">Software</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                <h3 className="footer-heading mb-4">Promo</h3>
                <a href="#" className="block-6">
                  <img src="images/hero_1.jpg" alt="Image placeholder" className="img-fluid rounded mb-4" />
                  <h3 className="font-weight-light  mb-0">Finding Your Perfect Shoes</h3>
                  <p>Promo from  nuary 15 — 25, 2019</p>
                </a>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="block-5 mb-5">
                  <h3 className="footer-heading mb-4">Contact Info</h3>
                  <ul className="list-unstyled">
                    <li className="address">203 Fake St. Mountain View, San Francisco, California, USA</li>
                    <li className="phone"><a href="tel://23923929210">+2 392 3929 210</a></li>
                    <li className="email">emailaddress@domain.com</li>
                  </ul>
                </div>
                <div className="block-7">
                  <form action="#" method="post">
                    <label htmlFor="email_subscribe" className="footer-heading">Subscribe</label>
                    <div className="form-group">
                      <input type="text" className="form-control py-4" id="email_subscribe" placeholder="Email" />
                      <input type="submit" className="btn btn-sm btn-primary" defaultValue="Send" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="row pt-5 mt-5 text-center">
              <div className="col-md-12">
                <p>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  Copyright © All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank" className="text-primary">Colorlib</a>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
}

export default Checkout
