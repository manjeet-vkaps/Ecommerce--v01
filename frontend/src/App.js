import React from 'react'

import Contact from './pages/Contact'
import Home from './pages/Home'
import About from './pages/About'
import Checkout from './pages/Checkout'
import Shop from './pages/Shop'
import ShopSingle from './pages/ShopSingle'
import ThankYou from './pages/ThankYou'
import Navbar from './header/Navbar'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Cart from './pages/Cart'
import Dashboard from './AdminBlock/ Dashboard'
import Login from './AdminBlock/AdminLogin'

import Posts from './AdminBlock/Posts'
import Categories from './AdminBlock/Categories'
import Users from './AdminBlock/Users'
import Details from './AdminBlock/Details'
import AdminLogin from './AdminBlock/AdminLogin'
import AddProduct from './AdminBlock/AddProduct'
import EditProduct from './AdminBlock/EditProduct'
import Register from './pages/Register'
import { CartProvider, useCart } from "react-use-cart";
import UserProfile from './pages/UserProfile'
import OrderDetails from './pages/OrderDetails'
import AdiminOrderDetails from "./AdminBlock/AdminOrderDetails"
//import Search from './AdminBlock/Search'
const App = () => {
    return (
        <Router>
            {/* <Search/> */}
            <Navbar/>   
            {/* <AddProduct/> */}
            <CartProvider>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/shop" element={<Shop/>}/>
                    <Route path="/shopsingle/:id" element={<ShopSingle/>}/>
                    <Route path="/userprofile" element={<UserProfile/>}/>
                     
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/checkout" element={<Checkout/>}/>
                    <Route path="/thankyou" element={<ThankYou/>}/>
                    <Route exact path="/adminlogin" element={<AdminLogin/>}/>
                    <Route path="/product/" element={<Posts/>}/>

                    <Route path="/categories" element={<Categories/>}/>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/details/:id" element={<Details/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/edit/:id" element={<EditProduct/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route exact path="/orderdetails/:id" element={<OrderDetails/>}/>
                    <Route exact path="/adminorderdetails/:id" element={<AdiminOrderDetails/>}/>
                    
                </Routes>
                </CartProvider>
            </Router>
          
      
    )
}

export default App
