import React, { ReactElement } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login/Login'
import Konwledge from './pages/konwledge/Konwledge'
import Register from './pages/register/Register'
import './App.css'

const App:React.FC = ():ReactElement =>{
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Konwledge />,
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
  

  return (<RouterProvider router={router} />)
}

export default App
