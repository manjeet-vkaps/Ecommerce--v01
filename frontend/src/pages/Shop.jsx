// import React,{useEffect,useState} from 'react'
// import axios from 'axios'
// import Categories from '../AdminBlock/Categories'
// import "./shop.css"
// import { Link } from 'react-router-dom'
// import { CartProvider, useCart } from "react-use-cart";

// const Shop = () => {
//   const { addItem } = useCart();
//   const [productData, setProductData] = useState([])

//   const [categoryProduct, setCategoryProduct] = useState([])

//   const getAllCategories = async () => {
//     const url = "/api/v1/categories"
//     const response = await fetch(url)
//     const data = await response.json()
//         // console.log(data.categories);
//     // console.log(data.products).map(());
//     setCategoryProduct(data.categories)
//     // console.log(categoryProduct);
//   }


//   // const getProductsAndCatID = async () => {

//   //   const url = "/api/v1/product"
//   //   const response = await fetch(url)
//   //   const data = await response.json()
//   //   // console.log(data.products).map(());
//   //   setFilterCat(data)
//   //   // console.log(productData);
//   // }

//   // function getProducts(){
//   //   axios.get("/api/v1/products").then((res)=>{
//   //     console.log(res)
     
//   //   })
//   // }

//   const getAllProducts = async () => {

//     const url = "/api/v1/products"
//     const response = await fetch(url)
//     const data = await response.json()
//     // console.log(data.products)
//     setProductData(data.products)
//     // console.log(productData);
//   }


//   const getProducts = async (_id)=>{
//     try {
//       const {data} = await axios.get(`/api/v1/products?category=${_id}`)
//       // console.log("product ", data)
//       setProductData(data.products)
      
//     } catch (err) {
//       console.log("err:", err.message);
//     }
//   }
 
//   // const allCategories = ['all', ...new Set(productData.map((item)=>(item.category))
//   // )]
//   //   console.log(allCategories) 

//   // const [categories,setCategories] = useState(allCategories)
  
//     useEffect(() => {
//       getAllProducts()
//       getAllCategories()
//       // getProducts()
//     }, [])
  
   
    
   

// //     const filterCategory = (category)=>{
// //     if(category === 'all'){
// //       setProductData(productData)
      
// //       return
// //     }
    
// //     const newCat = productData.filter((item)=> item.category === category)

// //     setProductData(newCat) 
// // }


//     return (
//         <div className="site-wrap">
       
//         <div className="bg-light py-3">
//           <div className="container">
//             <div className="row">
//               <div className="col-md-12 mb-0"><a href="index.html">Home</a> <span className="mx-2 mb-0">/</span> <strong className="text-black">Shop</strong></div>
//             </div>
//           </div>
//         </div>
//         <div className="site-section">
//           <div className="container">
//             <div className="row mb-5">
//               <div className="col-md-9 order-2">
//                 <div className="row">
//                   <div className="col-md-12 mb-5">
//                     <div className="float-md-left mb-4"><h2 className="text-black h5">Shop All</h2></div>
//                     <div className="d-flex">
//                       <div className="dropdown mr-1 ml-md-auto">
//                         <button type="button" className="btn btn-secondary btn-sm dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                           Latest
//                         </button>
//                         <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
//                           <a className="dropdown-item" href="#">Men</a>
//                           <a className="dropdown-item" href="#">Women</a>
//                           <a className="dropdown-item" href="#">Children</a>
//                         </div>
//                       </div>
//                       <div className="btn-group">
//                         <button type="button" className="btn btn-secondary btn-sm dropdown-toggle" id="dropdownMenuReference" data-toggle="dropdown">Reference</button>
//                         <div className="dropdown-menu" aria-labelledby="dropdownMenuReference">
//                           <a className="dropdown-item" href="#">Relevance</a>
//                           <a className="dropdown-item" href="#">Name, A to Z</a>
//                           <a className="dropdown-item" href="#">Name, Z to A</a>
//                           <div className="dropdown-divider" />
//                           <a className="dropdown-item" href="#">Price, low to high</a>
//                           <a className="dropdown-item" href="#">Price, high to low</a>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row mb-5">
//                   {productData.map((item,key)=>{
//                     // console.log(item._id);
                
//                      return(<> 
//                     <div className="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
//                      <div className="block-4 text-center border">
//                        <figure className="block-4-image">
//                          <Link to={`/shopsingle/${item._id}`}><img src={item.productImage} alt="Image placeholder" className="img-fluid" /></Link>
//                        </figure>
//                        <div className="block-4-text p-4">
//                          <h3><Link to={`/shopsingle/${item._id}`}>{item.name}</Link></h3>
//                          {/* <p className="mb-0">{item.category}</p> */}
//                          <p className="text-primary font-weight-bold">${item.price}</p>
//                          <p className="mb-0">{item.description}</p>
//                           {productData.map((p)=>console.log("product",p._id))}
                          
//                           {/* <Link to="/cart" onClick={()=>addItem(p._id)}>Add to Cart</Link> */}

//                        </div>
//                      </div>
//                    </div>
//                    </>
//                    )
//                   })}
                 
                  
                 
//                 </div>
//                 <div className="row" data-aos="fade-up">
//                   <div className="col-md-12 text-center">
//                     <div className="site-block-27">
//                       <ul>
//                         <li><a href="#">&lt;</a></li>
//                         <li className="active"><span>1</span></li>
//                         <li><a href="#">2</a></li>
//                         <li><a href="#">3</a></li>
//                         <li><a href="#">4</a></li>
//                         <li><a href="#">5</a></li>
//                         <li><a href="#">&gt;</a></li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-3 order-1 mb-5 mb-md-0">
//                 <div className="border p-4 rounded mb-4">
//                   <h3 className="mb-3 h6 text-uppercase text-black d-block">Categories</h3>
//                   <ul className="list-unstyled mb-0">
//                   {categoryProduct.map((el) => {
//                     // console.log(el);
            
//                     return (<>
//                       <li onClick={()=>getProducts(el._id)} className="mb-1">
//                         <button className="d-flex btn btn-secondary">
//                           <span>{el.catName}</span>{" "}
//                           <span className="text-black ml-auto">(2,220)</span>
//                         </button>
//                       </li>
                  
                      
//                       </>
//                     );
//                   })}

//                   </ul>
//                 </div>
//                 <div className="border p-4 rounded mb-4">
//                   <div className="mb-4">
//                     <h3 className="mb-3 h6 text-uppercase text-black d-block">Filter by Price</h3>
//                     <div id="slider-range" className="border-primary" />
//                     <input type="text" name="text" id="amount" className="form-control border-0 pl-0 bg-white" disabled />
//                   </div>
//                   <div className="mb-4">
//                     <h3 className="mb-3 h6 text-uppercase text-black d-block">Size</h3>
//                     <label htmlFor="s_sm" className="d-flex">
//                       <input type="checkbox" id="s_sm" className="mr-2 mt-1" /> <span className="text-black">Small (2,319)</span>
//                     </label>
//                     <label htmlFor="s_md" className="d-flex">
//                       <input type="checkbox" id="s_md" className="mr-2 mt-1" /> <span className="text-black">Medium (1,282)</span>
//                     </label>
//                     <label htmlFor="s_lg" className="d-flex">
//                       <input type="checkbox" id="s_lg" className="mr-2 mt-1" /> <span className="text-black">Large (1,392)</span>
//                     </label>
//                   </div>
//                   <div className="mb-4">
//                     <h3 className="mb-3 h6 text-uppercase text-black d-block">Color</h3>
//                     <a href="#" className="d-flex color-item align-items-center">
//                       <span className="bg-danger color d-inline-block rounded-circle mr-2" /> <span className="text-black">Red (2,429)</span>
//                     </a>
//                     <a href="#" className="d-flex color-item align-items-center">
//                       <span className="bg-success color d-inline-block rounded-circle mr-2" /> <span className="text-black">Green (2,298)</span>
//                     </a>
//                     <a href="#" className="d-flex color-item align-items-center">
//                       <span className="bg-info color d-inline-block rounded-circle mr-2" /> <span className="text-black">Blue (1,075)</span>
//                     </a>
//                     <a href="#" className="d-flex color-item align-items-center">
//                       <span className="bg-primary color d-inline-block rounded-circle mr-2" /> <span className="text-black">Purple (1,075)</span>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="site-section site-blocks-2">
//                   <div className="row justify-content-center text-center mb-5">
//                     <div className="col-md-7 site-section-heading pt-4">
//                       <h2>Categories</h2>
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-sm-6 col-md-6 col-lg-4 mb-4 mb-lg-0" data-aos="fade" data-aos-delay>
//                       <a className="block-2-item" href="#">
//                         <figure className="image">
//                           <img src="images/women.jpg" alt="" className="img-fluid" />
//                         </figure>
//                         <div className="text">
//                           <span className="text-uppercase">Collections</span>
//                           <h3>Women</h3>
//                         </div>
//                       </a>
//                     </div>
//                     <div className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0" data-aos="fade" data-aos-delay={100}>
//                       <a className="block-2-item" href="#">
//                         <figure className="image">
//                           <img src="images/children.jpg" alt="" className="img-fluid" />
//                         </figure>
//                         <div className="text">
//                           <span className="text-uppercase">Collections</span>
//                           <h3>Children</h3>
//                         </div>
//                       </a>
//                     </div>
//                     <div className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0" data-aos="fade" data-aos-delay={200}>
//                       <a className="block-2-item" href="#">
//                         <figure className="image">
//                           <img src="images/men.jpg" alt="" className="img-fluid" />
//                         </figure>
//                         <div className="text">
//                           <span className="text-uppercase">Collections</span>
//                           <h3>Men</h3>
//                         </div>
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <footer className="site-footer border-top">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-6 mb-5 mb-lg-0">
//                 <div className="row">
//                   <div className="col-md-12">
//                     <h3 className="footer-heading mb-4">Navigations</h3>
//                   </div>
//                   <div className="col-md-6 col-lg-4">
//                     <ul className="list-unstyled">
//                       <li><a href="#">Sell online</a></li>
//                       <li><a href="#">Features</a></li>
//                       <li><a href="#">Shopping cart</a></li>
//                       <li><a href="#">Store builder</a></li>
//                     </ul>
//                   </div>
//                   <div className="col-md-6 col-lg-4">
//                     <ul className="list-unstyled">
//                       <li><a href="#">Mobile commerce</a></li>
//                       <li><a href="#">Dropshipping</a></li>
//                       <li><a href="#">Website development</a></li>
//                     </ul>
//                   </div>
//                   <div className="col-md-6 col-lg-4">
//                     <ul className="list-unstyled">
//                       <li><a href="#">Point of sale</a></li>
//                       <li><a href="#">Hardware</a></li>
//                       <li><a href="#">Software</a></li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
//                 <h3 className="footer-heading mb-4">Promo</h3>
//                 <a href="#" className="block-6">
//                   <img src="images/hero_1.jpg" alt="Image placeholder" className="img-fluid rounded mb-4" />
//                   <h3 className="font-weight-light  mb-0">Finding Your Perfect Shoes</h3>
//                   <p>Promo from  nuary 15 — 25, 2019</p>
//                 </a>
//               </div>
//               <div className="col-md-6 col-lg-3">
//                 <div className="block-5 mb-5">
//                   <h3 className="footer-heading mb-4">Contact Info</h3>
//                   <ul className="list-unstyled">
//                     <li className="address">203 Fake St. Mountain View, San Francisco, California, USA</li>
//                     <li className="phone"><a href="tel://23923929210">+2 392 3929 210</a></li>
//                     <li className="email">emailaddress@domain.com</li>
//                   </ul>
//                 </div>
//                 <div className="block-7">
//                   <form action="#" method="post">
//                     <label htmlFor="email_subscribe" className="footer-heading">Subscribe</label>
//                     <div className="form-group">
//                       <input type="text" className="form-control py-4" id="email_subscribe" placeholder="Email" />
//                       <input type="submit" className="btn btn-sm btn-primary" defaultValue="Send" />
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//             <div className="row pt-5 mt-5 text-center">
//               <div className="col-md-12">
//                 <p>
//                   {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
//                   Copyright © All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank" className="text-primary">Colorlib</a>
//                   {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </footer>
//       </div>
//     )
// }

// export default Shop
import React, { useState, useEffect } from "react";
import { Form, FormControl, Button } from 'react-bootstrap'
import { Link, useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const axios = require("axios");

const Product = () => {
  const [prostate, setProstate] = useState([]);
  const [category, setCategory] = useState([]);
  const [skip,setSkip]=useState(0);
  const [keyword,setkeyword]=useState('');
  const [cat, setCat] = useState('')
  const [totalResults, setTotalResults] = useState(0)
  const limit=5



  const getAllCategory = async () => {
    try {
      const res = await axios.get("/api/v1/categories");
      setCategory(res.data.categories);
      // console.log("categoryonly:", res.data);
    } catch (error) {
      console.log("err:", error);
    };
  };

  const getAllProducts = async (limit, skip, keyword, category) => {
    try {
      const res = await axios.get(`/api/v1/products`, {
        params: { limit, skip, keyword, category },
      });
      
      setProstate(res.data.products);
      console.log("category:", res.data);
      return res.data.totalResults
     
    } catch (error) {
      console.log("err:", error);
    }
    
  };

  const getProducts = async (_id)=>{
    try {
      const {data} = await axios.get(`/products?category=${_id}`)
      console.log("product sayyed", data)
      setProstate(data)
    } catch (err) {
      console.log("err:", err.message);
    }
  }

  const handlePreviousClick = async () => {
    if (skip > 0) {
      setSkip(skip - limit)
    }
  }

  const handleNextClick = async () => {
    setSkip(skip + limit)
  }

  const handleChange = e => {
    setkeyword(e.target.value)
  }

  const handleSearchSubmit = e => {
    e.preventDefault()
    const populateProducts =  () => {
      getAllProducts(limit, skip, keyword, cat)
    }
    setSkip(0)
    // populateProducts()
  }

  useEffect(() => {
    const populateProducts = async () => {
      setTotalResults(await getAllProducts(limit, skip, keyword, cat))
    }
    populateProducts();
    getAllCategory();
    // getAllProducts();
  }, [limit ,skip , keyword ,cat]);

  return (
    <div className="site-wrap">
      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0">
              <a href="index.html">Home</a> <span className="mx-2 mb-0">/</span>{" "}
              <strong className="text-black">Shop</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-9 order-2">
              <div className="row">
                <div className="col-md-12 mb-5">
                  <div className="float-md-left mb-4">
                    <h2 className="text-black h5">Shop All</h2>
                  </div>
                  <div className="d-flex">
                  <div className="d-flex">
                  
                  <Form className="d-flex" onSubmit={handleSearchSubmit} style={{marginLeft:"414px"}}>
                      <FormControl
                        type="search"
                        placeholder="Search products"
                        className="me-2"
                        aria-label="Search"
                        minLength={3}
                        size="sm"
                        value={keyword}
                        onChange={handleChange}
                      />
                      <button type="submit" className="btn btn-secondary mx-3">
                        Search
                      </button>
                    </Form>
                
                   
                  </div>
                    
                  </div>
                </div>
              </div>


              <div className="row mb-5">
                {prostate.map((items) => {
                  console.log("items.productImage",items.productImage)
                  return (
                    <>
                      <div
                        className="col-sm-6 col-lg-4 mb-4"
                        data-aos="fade-up"
                      >
                        <div className="block-4 text-center border">
                          <figure className="block-4-image">
                            <Link to={`/shopsingle/${items._id}`}>
                              <img
                                src={items.productImage}
                                alt="Image placeholder"
                                className="img-fluid"
                              />
                            </Link>
                          </figure>

                          <div className="block-4-text p-4">
                            <h3>
                              <Link to={`/shopsingle/${items._id}`}>{items.name}</Link>
                            </h3>
                            <p className="mb-0">{items.sku}</p>
                            {/* <p className="mb-0">{items.category}</p> */}
                            <p className="mb-0">{items.description}</p>
                            <p className="text-primary font-weight-bold">
                              {items.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>


              <div className="row" data-aos="fade-up">
                <div className="col-md-12 text-center">
                <div className="d-flex justify-content-between align-items-center my-3">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={handlePreviousClick}
                      disabled={skip < 1}>
                      &larr; Previous
                    </Button>

                    <div className="text-center mx-2">
                      Page-{skip / limit + 1},
                      <span className="text-muted">
                        {' '}
                        Showing {prostate.length} out of {totalResults}{' '}
                        products.
                      </span>
                    </div>

                    <Button
                      variant="success"
                      size="sm"
                      onClick={handleNextClick}
                      disabled={totalResults - skip <= limit}>
                      Next &rarr;
                    </Button>
                  </div>
                </div>
              </div>


              
            </div>


            <div className="col-md-3 order-1 mb-5 mb-md-0">
              <div className="border p-4 rounded mb-4">
                <h3 className="mb-3 h6 text-uppercase text-black d-block">
                  Categories
                </h3>
                <ul className="list-unstyled mb-0">
                  {category.map((el) => { 
                    return (<>
                      <li  className="mb-1">
                        <Button onClick={
                          ()=>getAllProducts(limit,skip,keyword, el._id)} href="#" className="d-flex">
                          <span>{el.catName}</span>{" "}
                        </Button>
                      </li>
                  
                      
                      </>
                    );
                  })}
                </ul>
              </div>
              <div className="border p-4 rounded mb-4">
                <div className="mb-4">
                  <h3 className="mb-3 h6 text-uppercase text-black d-block">
                    Filter by Price
                  </h3>
                  <div id="slider-range" className="border-primary" />
                  <input
                    type="text"
                    name="text"
                    id="amount"
                    className="form-control border-0 pl-0 bg-white"
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <h3 className="mb-3 h6 text-uppercase text-black d-block">
                    Size
                  </h3>
                  <label htmlFor="s_sm" className="d-flex">
                    <input type="checkbox" id="s_sm" className="mr-2 mt-1" />{" "}
                    <span className="text-black">Small (2,319)</span>
                  </label>
                  <label htmlFor="s_md" className="d-flex">
                    <input type="checkbox" id="s_md" className="mr-2 mt-1" />{" "}
                    <span className="text-black">Medium (1,282)</span>
                  </label>
                  <label htmlFor="s_lg" className="d-flex">
                    <input type="checkbox" id="s_lg" className="mr-2 mt-1" />{" "}
                    <span className="text-black">Large (1,392)</span>
                  </label>
                </div>
                <div className="mb-4">
                  <h3 className="mb-3 h6 text-uppercase text-black d-block">
                    Color
                  </h3>
                  <a href="#" className="d-flex color-item align-items-center">
                    <span className="bg-danger color d-inline-block rounded-circle mr-2" />{" "}
                    <span className="text-black">Red (2,429)</span>
                  </a>
                  <a href="#" className="d-flex color-item align-items-center">
                    <span className="bg-success color d-inline-block rounded-circle mr-2" />{" "}
                    <span className="text-black">Green (2,298)</span>
                  </a>
                  <a href="#" className="d-flex color-item align-items-center">
                    <span className="bg-info color d-inline-block rounded-circle mr-2" />{" "}
                    <span className="text-black">Blue (1,075)</span>
                  </a>
                  <a href="#" className="d-flex color-item align-items-center">
                    <span className="bg-primary color d-inline-block rounded-circle mr-2" />{" "}
                    <span className="text-black">Purple (1,075)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="site-section site-blocks-2">
                <div className="row justify-content-center text-center mb-5">
                  <div className="col-md-7 site-section-heading pt-4">
                    <h2>Categories</h2>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col-sm-6 col-md-6 col-lg-4 mb-4 mb-lg-0"
                    data-aos="fade"
                    data-aos-delay
                  >
                    <a className="block-2-item" href="#">
                      <figure className="image">
                        <img
                          src="images/women.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </figure>
                      <div className="text">
                        <span className="text-uppercase">Collections</span>
                        <h3>Women</h3>
                      </div>
                    </a>
                  </div>
                  <div
                    className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0"
                    data-aos="fade"
                    data-aos-delay={100}
                  >
                    <a className="block-2-item" href="#">
                      <figure className="image">
                        <img
                          src="images/children.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </figure>
                      <div className="text">
                        <span className="text-uppercase">Collections</span>
                        <h3>Children</h3>
                      </div>
                    </a>
                  </div>
                  <div
                    className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0"
                    data-aos="fade"
                    data-aos-delay={200}
                  >
                    <a className="block-2-item" href="#">
                      <figure className="image">
                        <img
                          src="images/men.jpg"
                          alt=""
                          className="img-fluid"
                        />
                      </figure>
                      <div className="text">
                        <span className="text-uppercase">Collections</span>
                        <h3>Men</h3>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                    <li>
                      <a href="#">Sell online</a>
                    </li>
                    <li>
                      <a href="#">Features</a>
                    </li>
                    <li>
                      <a href="#">Shopping cart</a>
                    </li>
                    <li>
                      <a href="#">Store builder</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6 col-lg-4">
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">Mobile commerce</a>
                    </li>
                    <li>
                      <a href="#">Dropshipping</a>
                    </li>
                    <li>
                      <a href="#">Website development</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6 col-lg-4">
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">Point of sale</a>
                    </li>
                    <li>
                      <a href="#">Hardware</a>
                    </li>
                    <li>
                      <a href="#">Software</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
              <h3 className="footer-heading mb-4">Promo</h3>
              <a href="#" className="block-6">
                <img
                  src="images/hero_1.jpg"
                  alt="Image placeholder"
                  className="img-fluid rounded mb-4"
                />
                <h3 className="font-weight-light  mb-0">
                  Finding Your Perfect Shoes
                </h3>
                <p>Promo from nuary 15 — 25, 2019</p>
              </a>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="block-5 mb-5">
                <h3 className="footer-heading mb-4">Contact Info</h3>
                <ul className="list-unstyled">
                  <li className="address">
                    203 Fake St. Mountain View, San Francisco, California, USA
                  </li>
                  <li className="phone">
                    <a href="tel://23923929210">+2 392 3929 210</a>
                  </li>
                  <li className="email">emailaddress@domain.com</li>
                </ul>
              </div>
              <div className="block-7">
                <form action="#" method="post">
                  <label htmlFor="email_subscribe" className="footer-heading">
                    Subscribe
                  </label>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control py-4"
                      id="email_subscribe"
                      placeholder="Email"
                    />
                    <input
                      type="submit"
                      className="btn btn-sm btn-primary"
                      defaultValue="Send"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="row pt-5 mt-5 text-center">
            <div className="col-md-12">
              <p>
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                Copyright © All rights reserved | This template is made with{" "}
                <i className="icon-heart" aria-hidden="true" /> by{" "}
                <a
                  href="https://colorlib.com"
                  target="_blank"
                  className="text-primary"
                >
                  Colorlib
                </a>
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Product;