import {
    createBrowserRouter,
    redirect
} from "react-router-dom";
import AppLayout from "./pages/Layout";
import Login from './pages/login/Login'
import Konwledge from './pages/konwledge/Konwledge'
import Register from './pages/register/Register'
import WalletConnector from './pages/wallet/WalletConnector'
import AuthGuard from "./pages/authRouter/AuthRouter"
import User from "./pages/user/User"
import { getToken } from "./utils";


const isAuth = ()=>{
  const token = getToken()
  if(!token){
    throw new Response("Unauthorized",{status:401})
  }

  return {}
  
}
const layoutRouter = [
  {
    path: "/Konwledge",
    element: <Konwledge />,
  },
  {
    path: "/WalletConnector",
    element: <WalletConnector />,
  },
  {
    path: "/User",
    element: <User />,
  }, 
].map(item=>{
  return {
    ...item,
    errorElement: <AuthGuard />, // 在这里注入！
    loader:isAuth
  }
})
const routers = [
  {
    path: "/",
    loader:()=>redirect("/Konwledge"),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path:"/",
    element:<AppLayout></AppLayout>,
    children:layoutRouter
  }
]
export const router = createBrowserRouter(routers,{
  basename: "/web3"
})