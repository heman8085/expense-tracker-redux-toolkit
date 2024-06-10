import React from 'react';
import Login from '../auth/Login';
import ForgetPassword from '../auth/ForgetPassword';
import Signup from '../auth/Signup';
import { Route, Routes } from "react-router-dom";

const Auth = () => {
  return (
  <>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/forgetPassword' element={<ForgetPassword />}/>
         <Route path='/signup'  element={<Signup />}/>
      </Routes>
  </>
  )
}

export default Auth
