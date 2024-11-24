import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import axios from "axios"
const useLogout=()=>{
const {setAuth} =useContext(AuthContext)

const logout=async()=>{
setAuth({})
try{
const response= await axios("/logout",{withCredentials:true})
}catch(error){
console.log(error)
}
}
return logout
}

export default useLogout