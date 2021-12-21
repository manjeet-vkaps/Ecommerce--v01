import React,{useEffect,useState} from 'react'

import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'
import { mquery } from 'mongoose'
const UserProfile = () => {
  const [orders,setOrders] = useState([])
  const history = useNavigate()
  const id = JSON.parse(localStorage.getItem("user"))._id;
  const userInfo = JSON.parse(localStorage.getItem('user'))

    const [user, setUser] = useState(userInfo || null)

  
    console.log(user); 
    const updateUser = async (id)=>{
  
      const {data} = await axios.patch(`/api/v1/users/${id}`,user)
      window.alert("user updated!!")
      history("/userprofile")

    }
   
    const handleChange = e => {
      setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e)=>{
          e.preventDefault()
          updateUser(id)
             
    }
    
    const getMyOrders = async ()=>{

      try {
           const MyOrders = await axios.get("/api/v1/orders/me")
             setOrders(MyOrders.data.orders)
             console.log("order",orders);
          //  .then((result)=>{console.log("result",result.data.orders)})   

      } catch (error) {
        
      }
    }
  
       
    useEffect(()=>{
      updateUser()
      getMyOrders()
  },[])
  
  
    return (
      <>
        {/* ACTIONS */}
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <Link to="/" className="btn btn-secondary btn-block">
                  <i className="fas fa-arrow-left" /> Back to Home
                </Link>
              </div>
              <div className="col-md-4">
                <button disabled className="btn btn-success btn-block">
                  <i className="fas fa-lock" /> Change Password
                </button>
              </div>
              <div className="col-md-4">
                <button disabled className="btn btn-danger btn-block">
                  <i className="fas fa-trash" /> Delete Account
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* PROFILE */}
        <section id="profile" className="my-5">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h4>Edit Profile</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          name="name"
                          onChange={handleChange}
                          className="form-control"
                          value={user.name}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          onChange={handleChange}
                          value={user.email}
                        />
                      </div>
  
                      <div className="form-group">
                        <input
                        onClick={updateUser}
                          value="save changes"
                          type="submit"
                          className="btn btn-dark btn-block"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3 ml-auto">
                <h3>Your Avatar</h3>
                <img
                  src="img/avatar.png"
                  alt=""
                  className="d-block img-fluid mb-3"
                />
                <button className="btn btn-primary btn-block">Edit Image</button>
                <button className="btn btn-danger btn-block">Delete Image</button>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>My Orders</h4>
                </div>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>Order Id</th>
                      <th>Order Items</th>
                      <th>Order Price</th>
                      <th>Order Date</th>
                      <th />
                    </tr>
                  </thead>
                   <tbody> 
                     {orders.length > 0 ? (
                      orders.map(order => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.orderItems.length} item(s)</td>
                          <td>{order.totalPrice}</td>
                          <td>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <Link
                           
                              to={`/orderdetails/${order._id}`}

                              className="btn btn-secondary">
                              <i className="fas fa-angle-double-right" /> Details
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4}>
                          <h3 className="text-center">You have no orders yet </h3>
                        </td>
                      </tr>
                    )}
                  </tbody> 
                </table>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }


 
   

export default UserProfile
