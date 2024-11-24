import  {Outlet,Link} from "react-router-dom"
import Headers from "./Header"
const Layout=()=>{
    return(
        <>
        <Headers/>
        <Outlet/>
   <Link to={"/admin"}>private-admin</Link>
    </>
    )
}

export default Layout