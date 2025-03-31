import React, { ReactElement } from 'react'
import {
  RouterProvider,
} from "react-router-dom";

import { router } from './routes';
import './App.css'

const App:React.FC = ():ReactElement =>{
  return (<RouterProvider router={router} />)
}

export default App
