import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
const Categories = () => {
  const [categoryProduct, setCategoryProduct] = useState([])

  const [category, setCategory] = useState({
    catName: ""
  })

  let { catName } = category;


  let handleCategory = e => {
    let { name, value } = e.target
    setCategory({ ...category, [name]: value })
  }

   //add category
   let postCategory = async (e) => {
    e.preventDefault()

    axios.post("/api/v1/category/new", {
      catName: catName,
   
    })
    getAllCategories()

  }
  //delete category
  function deleteCategory(id){
    axios.delete(`/api/v1/category/${id}`).then((res)=>{
      console.log("Product deleted successfully...")
      getAllCategories()
    })
  }
  const getAllCategories = async () => {
    const url = "/api/v1/categories"
    const response = await fetch(url)
    const data = await response.json()
        console.log(data.categories);
    // console.log(data.products).map(());
    setCategoryProduct(data.categories)
    // console.log(categoryProduct);
  }
  useEffect(() => {
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
                <NavLink to="/dashboard" className="nav-link active">Dashboard</NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink to="/product" className="nav-link">Product</NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink to="/categories" className="nav-link">Categories</NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink to="/users" className="nav-link">Users</NavLink>
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
                <NavLink to="/adminlogin" className="nav-link">
                  <i className="fas fa-user-times" /> Logout
                </NavLink>
              </li>
            </ul>
      
          </div>
        </div>
      </nav>

    


        {/* HEADER */}
        <header id="main-header" className="py-2 bg-success text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-folder" /> Categories</h1>
              </div>
            </div>
          </div>
        </header>

        <section id="actions" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
          <div className="col-md-3">
              <a href="#" className="btn btn-success btn-block" data-toggle="modal" data-target="#addCategoryModal">
                <i className="fas fa-plus" /> Add Category
              </a>
            </div>
            
           
          </div>
        </div>
      </section>

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
              <form onSubmit={postCategory}>
                <div className="form-group">
                  <label htmlFor="catName">Title</label>
                  <input type="text" className="form-control"
                    name="catName"
                    value={catName}
                    onChange={handleCategory}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-success" data-dismiss="modal"
                onClick={postCategory}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
        {/* SEARCH */}
        <section id="search" className="py-4 mb-4 bg-light">
          {/* <div className="container">
            <div className="row">
              <div className="col-md-6 ml-auto">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search Categories..." />
                  <div className="input-group-append">
                    <button className="btn btn-success">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </section>
        {/* CATEGORIES */}
        <section id="categories">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <h4>Latest Categories</h4>
                  </div>
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Id</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                    {
                      categoryProduct.map((item, i) => {
                        console.log(item)
                        return (
                          <tr>
                            <td>{i + 1}</td>
                            <td>{item.catName}</td>
                            <td>{item.category}</td>
                            <td>{item._id}</td>
                            <td>{item.price}</td>


                            <td>
                              <button  className="btn btn-danger btn-block"
                                 onClick={()=>deleteCategory(item._id)} >
                                Delete 
                              </button>
                            </td>
                            <td>
                              
                            </td>
                            <td>
                              <NavLink to="/details" className="btn btn-secondary">
                                <i className="fas fa-angle-double-right" /> Details
                              </NavLink>
                            </td>
                          </tr>
                        )
                      })
                    }
                   </tbody>
                  </table>
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

export default Categories
