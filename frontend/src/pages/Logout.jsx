// import axios from 'axios'
// import React,{useEffect} from 'react'

// const Logout = () => {
        
//      useEffect(()=>{
//         logoutUser()
//      },[])
       
//      let logoutUser = async(e)=>{
//          e.preventDefault()

//          await axios.get("/api/v1/logout").then(res=>{
//             console.log(res);
//             localStorage.clear()
//             if(res.status !== 200){
//                window.alert("not logged out")
//             }
//             else{
//                 window.alert("logged out successfully")
//             }
//          })
            
         
//      }
//     // let logoutUser = async (e) => {
//     //     e.preventDefault()
    
//     //    await axios.get("/api/v1/logout", {
          
//     //       email:email,
//     //       password:password
//     //     }).then(res=>{
//     //       console.log(res);
           
            
//     //     })
    

//     return (
//         <div>
      
//         </div>
//     )
// }

// export default Logout
