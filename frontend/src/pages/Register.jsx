import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

import axios from 'axios';
const Register = () => {
  const history = useNavigate()
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        loading:false
    })

    const {name,email,password,loading} = user;

    let handleChange = (e)=>{
        let {name,value} = e.target
        setUser({...user, [name]:value})
    }
    //ADD USER 
    let postUser = async (e) => {
        e.preventDefault()
    
      try {
        await axios.post("/api/v1/register", {
          name: name,
          email:email,
          password:password
        }).then(res => {
          console.log(res)
          if (res.status === 401 || !res) {
              setUser({loading:true})
              let message = 'invalid cresedential!!'
              toast.error(message)
              // window.alert("Email wrong");
          }
           else if (res.status === 400) {
            setUser({loading:true})
             let message = "fill the fields"
             toast.error(message)
              // window.alert(" Fill the Fields");
    
    
          }
           else {
            setUser({loading:true})
             let message = 'registered successfully!!'
             toast.success(message)
              // window.alert(" Login Successful");
              history("/adminlogin");
        }
        
          
        })
      } catch (err
        ) {
         toast.error(err.message)
      }
      
        
          
      }

    
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
          <div className="container">
            <a href="index.html" className="navbar-brand">Blogen</a>
          </div>
        </nav>
        {/* HEADER */}
        <header id="main-header" className="py-2 bg-primary text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-user" /> Blogen Admin</h1>
              </div>
            </div>
          </div>
        </header>
        {/* ACTIONS */}
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
            </div>
          </div>
        </section>
        {/* LOGIN */}
        <section id="login">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="card">
                  <div className="card-header">
                    <h4>Account Register</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={postUser}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" 
                         name="name"
                         value={name}
                         onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" 
                        name="email"
                        value={email}
                         onChange={handleChange}
                         />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control"
                        name="password"
                        value={password}
                         onChange={handleChange}
                         />
                      </div>
                      {/* <input type="submit" defaultValue="Login" className="btn btn-primary btn-block" /> */}
                      <button className="btn btn-primary btn-block" onClick={postUser}>
                        {loading === true ? "loading" : "Register"}
                      </button>
                    </form>
                    <span>Already have an account
                        <Link to='/adminlogin'> login here </Link>
                        </span>
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

export default Register
