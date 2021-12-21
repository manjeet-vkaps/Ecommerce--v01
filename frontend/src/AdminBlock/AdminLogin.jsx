import React,{useState} from 'react'
import {  useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const history = useNavigate()
  const [user, setUser] = useState({
        
    email:"",
    password:"",
    loading :false
})

const {email,password,loading} = user;

let handleChange = (e)=>{
    let {name,value} = e.target
    setUser({...user, [name]:value})
}
//ADD USER 
let postUser = async (e) => {
    e.preventDefault()

     try {
      
      await axios.post("/api/v1/login", {
        
        email:email,
        password:password
      }).then(res=>{
        console.log("india",res);

            
      
     if( res.data.token && res.data.user.role === "admin"){

      setUser({loading:true})
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("admin", JSON.stringify(res.data.user));
        window.alert('Admin logged in  Successfully!!')
        // let message = `${res.data.user.role} logged in  Successfully!!`
        // toast.success(message)
        
        history('/Dashboard');
      }
         else if(res.data.token && res.data.user.role === "user"){

          setUser({loading:true})
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("user", JSON.stringify(res.data.user));
              window.alert('User Logged in Successfully!!')
              // let message = `${res.data.user.role} logged in  Successfully!!`
              // toast.success(message)
              history('/')
          }
          else if(res.status === 422 || !res) {

          setUser({loading:true})
            // window.alert("Invalid credentials");
            let message = "inavalid cresidentials!!"
            toast.error(message)
        } 
      }) 
      
     } 
     catch (err) {
         toast.error(err.message)
     }

  //   function userlogin(e) {
  //     e.preventDefault();
  //     axios.post("/login", {
  //         email: email,
  //         password: password
  //     }).then(res => {
  //         console.log("res",res)
  //         if (res.status === 422 || !res) {
  //             window.alert("Invalid credentials");
  //         } else {
  //             if(res.data.token && res.data.userLogin.role === "user"){
  //                 localStorage.setItem("token", res.data.token);
  //                 localStorage.setItem("user", JSON.stringify(res.data.userLogin));
  //                 window.alert('LOGIN SUCCESSFULL')
  //                 history('/')
  //             }else if( res.data.userLogin.role === "admin"){
  //                 history('/AdminIndex')
  //             }
  //         }
  //     })

  // }

    // .then(res => {
    //   console.log(res)
    //   if (res.status === 401 || !res) {
    //       window.alert("Email wrong");
    //   } else if (res.status === 400) {
    //       window.alert(" Fill the Fields");


    //   } else {
    //       window.alert(" Login Successful");
    //       history("/");
    // }
    
      
    // })
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
                    <h4>Account Login</h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={postUser}>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" 
                            name="email"
                            value={email}
                            onChange={handleChange}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" 
                              name="password"
                              value={password}
                              onChange={handleChange}/>
                      </div>
                      <button   className="btn btn-primary btn-block"
                      onClick={postUser}>{loading === true ? "loading" : "login"}</button>

                      
                    </form>
                    <span>Dont have an accout
                        <Link to='/register'> register here </Link>
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

export default AdminLogin;
