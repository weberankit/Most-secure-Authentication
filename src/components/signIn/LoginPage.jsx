import { useRef,useState } from "react";
import { Link,useNavigate ,useLocation} from 'react-router-dom';
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
const LoginPage=()=>{
const formRef=useRef(null)
const {auth,setAuth}=useContext(AuthContext)
const [errorMsg,setErrMsg] =useState()
const navigate=useNavigate()
const location=useLocation()
const fromWhereUserCameFrom=location?.state?.from?.pathName || "/"
function handleSubmit(e){
e.preventDefault()
    
  
 const userName=formRef.current["text"]?.value
 const userPassword=formRef.current["password"]?.value
 
 ///validating from
 
 
 if(userName?.trim()?.length===0){
 alert("please check userName")
 return 
 }
 
 
 
if(userPassword?.length<=1){
     alert("passwrod length must be greater than 1")
     return 
}
 console.log(userName,userPassword)
 
    ///database operzation

async function DataOperation(){
    try {
     
      const response = await axios.post("api-url",JSON.stringify( {
        username: userName,
        password: userPassword,
      }),
      {
        headers:{'Content-Type':'apllication/json'},
        withCredentials:true          
    
      }
    );

      if (response.data.success) {
        // Assume response contains a token for successful login
        const accesstoken = response?.data?.accessToken;
        const roles=response?.data?.roles
        setAuth({roles,accesstoken,userName,password})
       

        // Redirect or update app state to indicate user is logged in
        alert("Login successful!");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      if (!err?.response) {
        setErrMsg('No Server Response');
    } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
    } else {
        setErrMsg('Registration Failed')
    }
    }
  }
 DataOperation()
 //navigate user  to that position after login 

navigate(fromWhereUserCameFrom ,{replace:true})
   }





    return (
        <div className="flex items-center justify-center min-h-screen bg-yellow-400 relative">
          <div className="absolute top-0 justify-center  w-full bg-black rounded-sm flex"><img className="w-10" src="/dg-logo.png"></img><span className="text-white pt-2 ml-4 font-extrabold">Devout Growth Media</span></div>
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
            <h2 className="text-2xl font-bold text-center mb-6">Login to your account</h2>
            <form onSubmit={handleSubmit} ref={formRef}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                  name="text"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  name="password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Sign In
              </button>
              <div className="text-center mt-4">
                <Link to={"/reset"} className="text-blue-500 hover:underline">Forgot password?</Link>
              </div>
              <div className="text-center mt-2">
                <Link to={"/signUp"} className="text-blue-500 hover:underline">New User? Sign up now</Link>
               
              </div>
            </form>
          </div>
        </div>
      );
}

export default LoginPage