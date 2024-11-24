import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { Navigate, Outlet,useLocation } from "react-router-dom"
const RequireAuth=({allowRoles})=>{
    const {auth}=useContext(AuthContext)
    const location=useLocation()
    console.log(auth)
    return(
        <>
        {auth?.roles.find(role=>allowRoles?.includes(role))
        ?<Outlet/>
        :
          auth?.user?<Navigate to="/unauthorized" state={{ from: location }} replace />
           :<Navigate to={"/login"} state={{from:location}} replace/>
        }
        </>
    )
}

export default RequireAuth