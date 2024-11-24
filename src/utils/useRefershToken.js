import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import axios from "axios"

///we are going to use this when our acces-token are expired/lost
const useRefershToken=()=>{
const {setAuth} =useContext(AuthContext)
const refersh= async()=>{
    const response=await axios.get("/refersh",{withCredentials:true})
    setAuth((prev)=>{
        return {...prev ,
            roles:response.data.roles,
            accessToken:response.data.accessToken}
    })
    return response.data.accessToken

}
return refersh
}
export default useRefershToken