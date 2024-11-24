
import './App.css'
import LoginPage from './components/signIn/LoginPage'
import { createBrowserRouter,RouterProvider,Route, createRoutesFromElements } from 'react-router-dom'
import SignUpPage from './components/sigunUp/SignUp'
import ForgotPasswordPage from "./components/signIn/ForgotPassword"
import {AuthProvider} from "./context/AuthContext"
import Layout from './components/Layout'
import RequireAuth from './components/RequireAuth'
import DashHome from './components/protectedComponents/DashHome'
import Admin from './components/protectedComponents/Admin'
import Unauthorized from './components/Unauthorized'
import Missing from './components/Missing'
import PersistentLogin from './components/PersisitentLogin'
function App() {
 
  
const routePath=createBrowserRouter(
  
  createRoutesFromElements(
  <Route path="/" element={<Layout/>}>
   <Route path="unauthorized" element={<Unauthorized />} />
  <Route path="login" element={<LoginPage/>}/>
  <Route path="signUp" element={<SignUpPage/>}/>

  <Route element={<PersistentLogin/>}>
  <Route element={<RequireAuth allowRoles={[1334]}/>}>
  <Route path='/' element={<DashHome/>}/>
  <Route path='admin' element={<Admin/>}/>
  </Route>
  </Route>

  <Route path="*" element={<Missing />} />

  </Route>

  )
  /*
  [
  {path:"/",
    element:<LoginPage/>
  }
  ,
  {
    path:"/signUp",
    element:<SignUpPage/>
  }
  ,
  {
    path:"/reset",
    element:<ForgotPasswordPage/>
  }
]
*/  
)


  return (
    
   <AuthProvider>
   <RouterProvider router={routePath}/>
  </AuthProvider>
    
  )
}

export default App

