import React, { ReactElement } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import Register from './pages/register/Register'
import './App.css'

const App:React.FC = ():ReactElement =>{
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
