import React,{useState,useEffect} from 'react'
import { useParams,Link,useNavigate } from 'react-router-dom'

import axios  from 'axios'
import { Form, Dropdown } from 'react-bootstrap';

const Details = () => {
  const history = useNavigate()
  const {id} = useParams()
  const [categoryProduct, setCategoryProduct] = useState([])
  const [productData,setProductData] = useState([])
 
  const handleUpdateProduct = (e)=>{
    setProductData({...productData,[e.target.name] : e.target.value});
  }
   
  let handleSubmit = e =>{
    e.preventDefault()
         try {
        axios.put(`/api/v1/product/${id}`,productData)
      window.alert("product added successfully!!")
      
  } catch (error) {
       window.alert("invalid cresidential!!")
  }
}


    const getAllCategories = async () => {
      const url = "/api/v1/categories"
      const response = await fetch(url)
      const data = await response.json()
      // console.log("data", data)
      setCategoryProduct(data.categories)
      // console.log(productData);
    }
  
    const getSingleProduct = async (_id) => {
      try {
        const {data}  = await axios.get(`/api/v1/product/${id}`);
        // console.log("data",data.product);
        setProductData(data.product)
      } catch (err) {
        console.log("err:", err.message);
      }
    };
  
    const [imagess,setImagess]=useState();
    const [imageFile,setImageFile]=useState();
    
    const updateProductImage = async (id, formData) => {
      try {
        // const userToken = JSON.parse(localStorage.getItem('token'))
        const headers = {
          // Authorization: `Bearer ${userToken && userToken}`,
          'Content-Type': 'multipart/form-data',
        }
        const { data } = await axios.patch(
          `/api/v1/updateimage/${id}`,
          formData,
          { headers }
        )
        console.log('update  product image  ran')
        console.log("dataimage",data);
        return data.image
      } catch (err) {
       console.log(err.response.data.error)
      }
    }


    const handleUpdateImage = async () => {
      const formData = new FormData()
      formData.append('productImage', imageFile)
  
      console.log('Add product to run')
      const imagePath = await updateProductImage(id, formData)
      console.log("imagePath",imagePath);
      setImagess(imagePath)
  
   
  
      setImageFile(null)
    }



    useEffect((id) => {
      getSingleProduct()
      // getAllProducts()
      getAllCategories()
    }, [])
     
  

  

 

 

    return (
        <div>
       <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
        <div className="container">
          <a href="index.html" className="navbar-brand">Blogen</a>
          <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav">
              <li className="nav-item px-2">
                <Link to="/dashboard" className="nav-link active">Dashboard</Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/product" className="nav-link">Product</Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/categories" className="nav-link">Categories</Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/users" className="nav-link">Users</Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown mr-3">
                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                  <i className="fas fa-user" /> Welcome Brad
                </a>
                <div className="dropdown-menu">
                  <a href="profile.html" className="dropdown-item">
                    <i className="fas fa-user-circle" /> Profile
                  </a>
                  <a href="settings.html" className="dropdown-item">
                    <i className="fas fa-cog" /> Settings
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <Link to="/adminlogin" className="nav-link">
                  <i className="fas fa-user-times" /> Logout
                </Link>
              </li>
            </ul>
      
          </div>
        </div>
      </nav>
        {/* HEADER */}
        <header id="main-header" className="py-2 bg-primary text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  Update</h1>
              </div>
            </div>
          </div>
        </header>
        {/* ACTIONS */}
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <a href="index.html" className="btn btn-light btn-block">
                  <i className="fas fa-arrow-left" /> Back To Dashboard
                </a>
              </div>
              <div className="col-md-3">
                <a href="index.html" className="btn btn-success btn-block">
                  <i className="fas fa-check" /> Save Changes
                </a>
              </div>
            
            </div>
          </div>
        </section>
        {/* DETAILS */}
        <div className="modal-body">
          <img src={imagess}/>
              <Form  encType='multipart/form-data'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Name" name="name" 
                  // onChange={(e)=>setName(e.target.value)} 
                    onChange={handleUpdateProduct}
                  value={productData.name}   autocomplete="off" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Sku</Form.Label>
                  <Form.Control type="String" placeholder="Enter Sku" name="sku" 
             
                  onChange={handleUpdateProduct}
                 

                   
                  value={productData.sku} />
                </Form.Group>
                {/* <div class="form-group">
                  <label >Category</label>
                  <Form.Select
                    aria-label="Default select example"
                    name="category"

                    // onChange={(e)=>setCategory(e.target.value)} 
                    onChange={handleUpdateProduct}
                    

                 
                  >

                    {categoryProduct.map((item) => {
                      // console.log(item, "items");
                      return <option value={item._id}>{item.catName}</option>;
                    })}
                  </Form.Select>
                </div> */}
                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Category" name="category" onChange={handleChange} value={product.category}/>
                                    </Form.Group> */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" placeholder="Enter Price" name="price" 
                  // onChange={(e)=>setPrice(e.target.value)} 
                  onChange={handleUpdateProduct}
                    

                  
                  value={productData.price} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} name="description" 
                  // onChange={(e)=>setDescription(e.target.value)} 
                  onChange={handleUpdateProduct}
                   
                  
                  value={productData.description} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label >Upload Image</Form.Label>
                  <Form.Control type="file" name="productImage" 
                   accept=".png, .jpg, .jpeg"
                   onChange={(e)=>setImageFile(e.target.files[0])}
                    
                  />
                  <button onClick={(e)=>{
                        e.preventDefault();
                        handleUpdateImage();
                      }}> Update Image</button>
                </Form.Group>
              </Form>
            </div>
            <div className="col-md-3">
               <button onClick={handleSubmit} className="btn btn-success btn-block">
                 Update
               </button>
              </div>
        {/* FOOTER */}
        <footer id="main-footer" className="bg-dark text-white mt-5 p-5">
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="lead text-center">
                  Copyright ©
                  <span id="year" />
                  Blogen
                </p>
              </div>
            </div>
          </div>
        </footer>
        {/* MODALS */}
        {/* ADD POST MODAL */}
        <div className="modal fade" id="addPostModal">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Add Post</h5>
                <button className="close" data-dismiss="modal">
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select className="form-control">
                      <option value>Web Development</option>
                      <option value>Tech Gadgets</option>
                      <option value>Business</option>
                      <option value>Health &amp; Wellness</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Upload Image</label>
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="image" />
                      <label htmlFor="image" className="custom-file-label">Choose File</label>
                    </div>
                    <small className="form-text text-muted">Max Size 3mb</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="body">Body</label>
                    <textarea name="editor1" className="form-control" defaultValue={""} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" data-dismiss="modal">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
        {/* ADD CATEGORY MODAL */}
        <div className="modal fade" id="addCategoryModal">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Add Category</h5>
                <button className="close" data-dismiss="modal">
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" data-dismiss="modal">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
        {/* ADD USER MODAL */}
        <div className="modal fade" id="addUserModal">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-warning text-white">
                <h5 className="modal-title">Add User</h5>
                <button className="close" data-dismiss="modal">
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" className="form-control" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-warning" data-dismiss="modal">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Details
