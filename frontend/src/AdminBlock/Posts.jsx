import React, { useState, useEffect } from 'react'


import { deleteProduct } from "../service/api";
import { Link,useNavigate ,useParams} from "react-router-dom"
import axios from 'axios';
import { toast } from 'react-toastify';
import AddProduct from './AddProduct';
import { Form, Dropdown } from 'react-bootstrap';
const Posts = () => {

    const keyword = useParams()
    const history = useNavigate()
  const [productData, setProductData] = useState([])

  const [categoryProduct, setCategoryProduct] = useState([])
  const [fileName, setFileName] = useState("")
  const [name,setName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] =  useState("")
  const [description, setDescription] = useState("")
  const [sku , setSku] = useState("")

  const [skip,setSkip]=useState(0);
    // const [keyword,setkeyword]=useState('');
    const [totalResults, setTotalResults] = useState(0)
     const limit=100

  // const [product, setProduct] = useState({
  //   name: "",
  //   category: "",
  //   price: "",
  //   description: "",
  //   sku: "",

  // })
  // let { name, price, description, sku, category } = product
  
  let onChangeFile = (e)=>{
      setFileName(e.target.files[0])
  }
  const changeOnClick= (e)=> {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name",name)
    formData.append("price",price) 
    formData.append("category",category) 
    formData.append("description",description) 
    formData.append("sku",sku) 
    formData.append("productImage",fileName) 
    
    setFileName("")
    setName("")
    setCategory("")
    setPrice("")
    setDescription("")
    setSku("")

   
  try {
    axios.post("/api/v1/product/new", formData )
      .then((res)=>{console.log("res",res)})
      window.alert("product added successfully!!")
      history("/shop")
  } catch (error) {
       window.alert("invalid cresidential!!")
  }
      

    }
      // then((res)=>console.log(res))
      //   name: name,
      //   price: price,
      //   description: description,
      //   sku: sku,
      //   category: category
      // })
      // getAllProducts()
  
    


  // let handleProduct = (e) => {
  //   let { name, value } = e.target
  //   setProduct({ ...product, [name]: value })
  // }

  //add product
  

  function deleteProduct(id) {
    axios.delete(`/api/v1/product/${id}`).then((res) => {
      console.log("Product deleted successfully...")
      getProducts()
    })
  }



  const getProducts = async (limit, skip) => {
    try {
      const res = await axios.get("/api/v1/products", {
        params: { limit, skip },
      });
      const data = res.data;
      console.log("dataproduct",data);
      setProductData(data.products);
    } catch (error) {
      console.log("err:", error);
    }
  };

  const getAllCategories = async () => {
    const url = "/api/v1/categories"
    const response = await fetch(url)
    const data = await response.json()
    // console.log("data", data)
    setCategoryProduct(data.categories)
    // console.log(productData);
  }

  // let names, values;

  // const handleCategory = (e) => {
  //   console.log(e)

  //   names = e.target.name;
  //   values = e.target.value;

  //   setCategoryProduct({ ...product, [names]: values })
  // }

  useEffect(() => {
    const populateProducts = async () => {
      setTotalResults(await getProducts(limit, skip, keyword))
    }
    populateProducts();
    getAllCategories()
  }, [limit, skip, keyword])




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
                <i className="fas fa-pencil-alt" /> Products</h1>
            </div>
          </div>
        </div>
      </header>

      <section id="actions" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <a href="#" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addPostModal">
                <i className="fas fa-plus" /> Add Product
              </a>
            </div>


          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section id="search" className="py-4 mb-4 bg-light">
        {/* <div className="container">
          <div className="row">
            <div className="col-md-6 ml-auto">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search Posts..." />
                <div className="input-group-append">
                  <button className="btn btn-primary">Search</button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </section>
      {/* ADD POST MODAL */}
      <div className="modal fade" id="addPostModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Add Product</h5>
              <button className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <Form onSubmit={changeOnClick}  encType='multipart/form-data'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Name" name="name" 
                  onChange={(e)=>setName(e.target.value)} 
                  value={name}   autocomplete="off" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Sku</Form.Label>
                  <Form.Control type="String" placeholder="Enter Sku" name="sku" 
                  onChange={(e)=>setSku(e.target.value)} 
                   
                  value={sku} />
                </Form.Group>
                <div class="form-group">
                  <label >Category</label>
                  <Form.Select
                    aria-label="Default select example"
                    name="category"
                    onChange={(e)=>setCategory(e.target.value)} 
                 
                  >

                    {categoryProduct.map((item) => {
                      // console.log(item, "items");
                      return <option value={item._id}>{item.catName}</option>;
                    })}
                  </Form.Select>
                </div>
                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Category" name="category" onChange={handleChange} value={product.category}/>
                                    </Form.Group> */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" placeholder="Enter Price" name="price" 
                  onChange={(e)=>setPrice(e.target.value)} 
                  
                  value={price} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} name="description" 
                  onChange={(e)=>setDescription(e.target.value)} 
                  
                  value={description} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label >Upload Image</Form.Label>
                  <Form.Control type="file" name="productImage" 
                   accept=".png, .jpg, .jpeg"
                  onChange={onChangeFile} 
                 
                  />
                </Form.Group>
              </Form>
            </div>
            <div className="modal-footer">
              <button onClick={changeOnClick} className="btn btn-primary" data-dismiss="modal"  >Save Changes</button>
            </div>
          </div>
        </div>

      </div>
      {/* POSTS */}
      <section id="posts">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4>Latest Posts</h4>
                </div>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>product_ID</th>
                      <th>Price</th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {
                      productData.map((item, i) => {
                        // console.log(item)
                        return (
                          <tr>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item._id}</td>
                            <td>{item.price}</td>


                            {/* <td>
                              <button className="btn btn-danger btn-block"
                                onClick={() => deleteProduct(item._id)}>
                                Delete
                              </button>
                            </td> */}
                            <td>

                            </td>
                            <td>
                              <Link to={`/details/${item._id}`} className="btn btn-secondary">
                                <i className="fas fa-angle-double-right" /> Details
                              </Link>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
                {/* PAGINATION */}
                {/* <nav className="ml-4">
                  <ul className="pagination">
                    <li className="page-item disabled">
                      <a href="#" className="page-link">Previous</a>
                    </li>
                    <li className="page-item active">
                      <a href="#" className="page-link">1</a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">2</a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">3</a>
                    </li>
                    <li className="page-item">
                      <a href="#" className="page-link">Next</a>
                    </li>
                  </ul>
                </nav> */}
              </div>
            </div>
          </div>
        </div>
      </section>
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
    </div>
  )
}

export default Posts
