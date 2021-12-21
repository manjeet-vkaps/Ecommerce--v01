import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { deleteProduct } from "../service/api";
import {Link} from "react-router-dom"
import axios from 'axios';
import { toast } from 'react-toastify';
import AddProduct from './AddProduct';


const Dashboard = () => {
  // const userInfo = JSON.parse(localStorage.getItem('user'))
  //   console.log(userInfo);
    // const [user, setUser] = useState(userInfo || null)
  let i = 1;
 const [order, setOrder] = useState([])
 const [item, setItem] = useState([])
  
  const getallOrders = async ()=>{
    try {
      const {data} = await axios.get("/api/v1/orders")
      console.log("orders", data.orders)
      setOrder(data.orders)      
      // console.log(order); 
    } catch (err) {
      console.log("err:", err.message);
    }
  }



  
  useEffect(()=>{

    getallOrders()
  },[]) 

 
  
    
    
    



  
  




 


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
                <li>
                  <ul className="dropdown-menu">
                    <a href="profile.html" className="dropdown-item">
                      <i className="fas fa-user-circle" /> Profile
                    </a>
                    <a href="settings.html" className="dropdown-item">
                      <i className="fas fa-cog" /> Settings
                    </a>
                  </ul>
                </li>
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
                <i className="fas fa-cog" /> Dashboard</h1>
            </div>
          </div>
        </div>
      </header>
      {/* ACTIONS */}
      {/* <section id="actions" className="py-4 mb-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <a href="#" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addPostModal">
                <i className="fas fa-plus" /> Add Post
              </a>
            </div>
            <div className="col-md-3">
              <a href="#" className="btn btn-success btn-block" data-toggle="modal" data-target="#addCategoryModal">
                <i className="fas fa-plus" /> Add Category
              </a>
            </div>
            <div className="col-md-3">
              <a href="#" className="btn btn-warning btn-block" data-toggle="modal" data-target="#addUserModal">
                <i className="fas fa-plus" /> Add User
              </a>
            </div>
          </div>
        </div>
      </section> */}
      {/* POSTS */}
      <section id="posts">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="card">
                <div className="card-header">
                  <h4>Latest Products</h4>
                </div>


                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>User_id</th>
                      <th>TotalPrice</th>
                      <th>CreatedAt</th>
                       
                      <th />
                    </tr>
                  </thead>
                   <tbody>
                       {order.map((order)=>{
                         console.log("items",order);
                         //const data = items.orderItems 
                         //consol e.log("data",data);
                        //  setItem(item)
                         return(
                         <>
                          <tr>
                            <td>{i++}</td>
                            <td>{order.user}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.updatedAt}</td>
                            
                            <td>
                            <Link
                           
                              to={`/adminorderdetails/${order._id}`}

                              className="btn btn-secondary">
                              <i className="fas fa-angle-double-right" /> Details
                            </Link>
                          </td>
                          </tr>
                         
                         
                         </>)
                       })}
                   </tbody>
                </table>


              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center bg-primary text-white mb-3">
                <div className="card-body">
                  <h3>Products</h3>
                  <h4 className="display-4">
                    <i className="fas fa-pencil-alt" /> 6
                  </h4>
                  <Link to="/product" className="btn btn-outline-light btn-sm">View</Link>
                </div>
              </div>
              <div className="card text-center bg-success text-white mb-3">
                <div className="card-body">
                  <h3>Categories</h3>
                  <h4 className="display-4">
                    <i className="fas fa-folder" /> 4
                  </h4>
                  <Link to="/categories" className="btn btn-outline-light btn-sm">View</Link>
                </div>
              </div>
              <div className="card text-center bg-warning text-white mb-3">
                <div className="card-body">
                  <h3>Users</h3>
                  <h4 className="display-4">
                    <i className="fas fa-users" /> 4
                  </h4>
                  <Link to="/users" className="btn btn-outline-light btn-sm">View</Link>
                </div>
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

export default Dashboard
