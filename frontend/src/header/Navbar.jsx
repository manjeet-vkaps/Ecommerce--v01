import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {


  const history = useNavigate()




  let logoutUser = async (e) => {
    e.preventDefault()
     
    
    try {
        axios.post("/api/v1/logout")
        localStorage.clear()
        window.alert("logout successfully!!")
        history("/adminlogin")
    } catch (error) {
         let message = "invalid cresidential"
        window.alert(error.message);
    }
  }
        
       

            
      
     

  return (
    <div>
      <header className="site-navbar" role="banner">
        <div className="site-navbar-top">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-6 col-md-4 order-2 order-md-1 site-search-icon text-left">
                <form action className="site-block-top-search">
                  <span className="icon icon-search2" />
                  <input type="text" className="form-control border-0" placeholder="Search" />
                </form>
              </div>
              <div className="col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2 text-center">
                <div className="site-logo">
                  <a href="index.html" className="js-logo-clone">Shoppers</a>
                </div>
              </div>
              <div className="col-6 col-md-4 order-3 order-md-3 text-right">
                <div className="site-top-icons">
                  <ul>


                    <li><Link to="/adminlogin"><span className="icon icon-person" />Login</Link></li>
                    
                    <li onClick={logoutUser} style={{cursor:"pointer"}}><span className="icon icon-person"
                       />logout</li>

                    <li><a href="#"><span className="icon icon-heart-o" /></a></li>
                    <li>
                      <Link to="/cart" className="site-cart">
                        <span className="icon icon-shopping_cart" />
                        <span className="count">2</span>
                      </Link>
                    </li>
                    <li><Link to="/userprofile"><span className="icon icon-person" />userProfile</Link></li>
                    <li><Link to="/dashboard"><span className="icon icon-person" />adminblog</Link></li>
                    
                    <li className="d-inline-block d-md-none ml-md-0"><a href="#" className="site-menu-toggle js-menu-toggle"><span className="icon-menu" /></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav className="site-navigation text-right text-md-center" role="navigation">
          <div className="container">
            <ul className="site-menu js-clone-nav d-none d-md-block">
              <li className="has-children active">
                <Link to="/">Home</Link>
                <ul className="dropdown">
                  <li><a href="#">Menu One</a></li>
                  <li><a href="#">Menu Two</a></li>
                  <li><a href="#">Menu Three</a></li>
                  <li className="has-children">
                    <a href="#">Sub Menu</a>
                    <ul className="dropdown">
                      <li><a href="#">Menu One</a></li>
                      <li><a href="#">Menu Two</a></li>
                      <li><a href="#">Menu Three</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="has-children">
                <Link to="/about">About</Link>
                <ul className="dropdown">
                  <li><a href="#">Menu One</a></li>
                  <li><a href="#">Menu Two</a></li>
                  <li><a href="#">Menu Three</a></li>
                </ul>
              </li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/catalouge">Catalogue</Link></li>
              <li><Link to="/newarrivals">New Arrivals</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
