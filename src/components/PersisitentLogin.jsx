import { useState,useEffect } from "react"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import useRefershToken from "../utils/useRefershToken"
import { Outlet } from "react-router-dom"
const PersistentLogin=()=>{
    const [isLoading,setIsLoading]=useState(true)
    const {auth} =useContext(AuthContext)
    const refersh=useRefershToken()
    useEffect(()=>{
        let isMounted=true
       const verifyRefreshToken= async()=>{
         try{
        
      await refersh()
      }catch(error){
        
      }finally{
       isMounted && setIsLoading(false)
      }
       } 
      !auth?.accesToken? verifyRefreshToken():setIsLoading(false)
     return()=>isMounted=false
       },[])
   
    return(
       <>
       {isLoading?<p>loading</p>:<Outlet/>}
       </>
    )
}

export default PersistentLogin