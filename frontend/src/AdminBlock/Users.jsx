import React,{useState,useEffect} from 'react'
import axios from "axios" 
import { Link } from 'react-router-dom'

const Users = () => {
     let i =1
    const [users,setUsers] = useState([])

    
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/user")
       
      const data = res.data;
      console.log("users",data);
      setUsers(data);
    } catch (error) {
      console.log("err:", error);
    }
  };

 useEffect(()=>{
   getUsers()
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
        <header id="main-header" className="py-2 bg-warning text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-users" /> Users</h1>
              </div>
            </div>
          </div>
        </header>
        {/* SEARCH */}
        {/* <section id="search" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-6 ml-auto">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search Users..." />
                  <div className="input-group-append">
                    <button className="btn btn-warning">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* USERS */}
        <section id="users">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <h4>Latest Users</h4>
                  </div>
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>role</th>
                        <th>users_Id</th>
                         
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                    {users.map((user)=>{
                      return(
                        <>
                        
                        <tr>
                          <td>{i++}</td>
                           
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>{user._id}</td>
                          
                        </tr>
                     
                        </>
                      )
                    })}
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

export default Users
