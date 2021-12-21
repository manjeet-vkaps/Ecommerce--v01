import React,{useState,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom'
import axios from 'axios';
import { useCart } from 'react-use-cart';
const ShopSingle = () => {
  const {addItem}=useCart();

  const { id } = useParams();
  const [cart,setCart]=useState([])

  const [pro, setPro] = useState({});
  
  

  const getSingleProduct = async (_id) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`);
      console.log("data",data.product);
       setPro(data.product);
      console.log("product",pro);
    } catch (err) {
      console.log("err:", err.message);
    }
  };
  const CartItem =  () => {
     if(localStorage.getItem("pro")){
       setCart(JSON.parse(localStorage.getItem("pro")))
     }
    //  alert("item added in cart")
     setCart([...cart,pro])
     console.log("cartssss",cart)
     // localStorage.setItem("product",JSON.stringify(cart))
   }

  useEffect(() => {
    getSingleProduct();
   CartItem()

  }, []);
    return (
        <div className="site-wrap">
        
        <div className="bg-light py-3">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mb-0"><a href="index.html">Home</a> <span className="mx-2 mb-0">/</span> <strong className="text-black">{pro.name }</strong></div>
            </div>
          </div>
        </div>  
        <div className="site-section">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <img src={pro.productImage} alt="Image" className="img-fluid" />
              </div>
              <div className="col-md-6">
                <h2 className="text-black">{pro.name}</h2>
                <p>{cart.description}</p>
                <p><strong className="text-primary h4">${pro.price}</strong></p>
                <div className="mb-1 d-flex">
                  <label htmlFor="option-sm" className="d-flex mr-3 mb-3">
                    <span className="d-inline-block mr-2" style={{top: '-2px', position: 'relative'}}><input type="radio" id="option-sm" name="shop-sizes" /></span> <span className="d-inline-block text-black">Small</span>
                  </label>
                  <label htmlFor="option-md" className="d-flex mr-3 mb-3">
                    <span className="d-inline-block mr-2" style={{top: '-2px', position: 'relative'}}><input type="radio" id="option-md" name="shop-sizes" /></span> <span className="d-inline-block text-black">Medium</span>
                  </label>
                  <label htmlFor="option-lg" className="d-flex mr-3 mb-3">
                    <span className="d-inline-block mr-2" style={{top: '-2px', position: 'relative'}}><input type="radio" id="option-lg" name="shop-sizes" /></span> <span className="d-inline-block text-black">Large</span>
                  </label>
                  <label htmlFor="option-xl" className="d-flex mr-3 mb-3">
                    <span className="d-inline-block mr-2" style={{top: '-2px', position: 'relative'}}><input type="radio" id="option-xl" name="shop-sizes" /></span> <span className="d-inline-block text-black"> Extra Large</span>
                  </label>
                </div>
                <div className="mb-5">
                  <div className="input-group mb-3" style={{maxWidth: '120px'}}>
                    <div className="input-group-prepend">
                      <button className="btn btn-outline-primary js-btn-minus" type="button">−</button>
                    </div>
                    <input type="text" className="form-control text-center" defaultValue={1} placeholder aria-label="Example text with button addon" aria-describedby="button-addon1" />
                    <div className="input-group-append">
                      <button className="btn btn-outline-primary js-btn-plus" type="button">+</button>
                    </div>
                  </div>
                </div>
                <p>
                <p><Link
                    to="/cart"
                    className="buy-now btn btn-sm btn-primary"
                    onClick={() => {
                      let item = {
                        ...pro,
                        id: pro._id,
                      }
                      addItem(item)
                    }}
                  >
                    Add To Cart
                  </Link></p>
                  </p>
              </div>
              
           
           
            </div>
          </div>
        </div>
        <div className="site-section block-3 site-blocks-2 bg-light">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-7 site-section-heading text-center pt-4">
                <h2>Featured Products</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="nonloop-block-3 owl-carousel">
                  <div className="item">
                    <div className="block-4 text-center">
                      <figure className="block-4-image">
                        <img src="images/cloth_1.jpg" alt="Image placeholder" className="img-fluid" />
                      </figure>
                      <div className="block-4-text p-4">
                        <h3><a href="#">Tank Top</a></h3>
                        <p className="mb-0">Finding perfect t-shirt</p>
                        <p className="text-primary font-weight-bold">$50</p>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="block-4 text-center">
                      <figure className="block-4-image">
                        <img src="images/shoe_1.jpg" alt="Image placeholder" className="img-fluid" />
                      </figure>
                      <div className="block-4-text p-4">
                        <h3><a href="#">Corater</a></h3>
                        <p className="mb-0">Finding perfect products</p>
                        <p className="text-primary font-weight-bold">$50</p>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="block-4 text-center">
                      <figure className="block-4-image">
                        <img src="images/cloth_2.jpg" alt="Image placeholder" className="img-fluid" />
                      </figure>
                      <div className="block-4-text p-4">
                        <h3><a href="#">Polo Shirt</a></h3>
                        <p className="mb-0">Finding perfect products</p>
                        <p className="text-primary font-weight-bold">$50</p>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="block-4 text-center">
                      <figure className="block-4-image">
                        <img src="images/cloth_3.jpg" alt="Image placeholder" className="img-fluid" />
                      </figure>
                      <div className="block-4-text p-4">
                        <h3><a href="#">T-Shirt Mockup</a></h3>
                        <p className="mb-0">Finding perfect products</p>
                        <p className="text-primary font-weight-bold">$50</p>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="block-4 text-center">
                      <figure className="block-4-image">
                        <img src="images/shoe_1.jpg" alt="Image placeholder" className="img-fluid" />
                      </figure>
                      <div className="block-4-text p-4">
                        <h3><a href="#">Corater</a></h3>
                        <p className="mb-0">Finding perfect products</p>
                        <p className="text-primary font-weight-bold">$50</p>
                      </div>
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

export default ShopSingle
