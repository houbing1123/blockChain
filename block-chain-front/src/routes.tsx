import {
    createBrowserRouter,
} from "react-router-dom";
import Login from './pages/login/Login'
import Konwledge from './pages/konwledge/Konwledge'
import Register from './pages/register/Register'
import WalletConnector from './pages/wallet/WalletConnector'


export const router = createBrowserRouter([
    {
      path: "/Konwledge",
      element: <Konwledge />,
    },
    {
      path: "/WalletConnector",
      element: <WalletConnector />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ])