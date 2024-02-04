"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";
import ToastProvider from "@/components/ToastProvider";
import { login_api } from "@/service/APIs";
import cookie from 'js-cookie';

import { useRouter } from 'next/navigation'





const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [show_password, setShow_password] = useState(false);

  const router = useRouter()

 



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name] : value,
    });
  };

 


  const submit_form = async () => {

    if (formData.email == "") {
        return toast.error("Enter your email");
    }
   
    if (formData.password == "") {
        return toast.error("Enter your Password");
    }

    try {
      const { data } = await axios.post(
        login_api,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(data.error == 1) {
        toast.error(data.message);
      }
      if(data.success == 1) {
        toast.success(data.message);
        cookie.set("resturent_user_token", data.token,  { expires: 30 });
        cookie.set("resturent_user_data", JSON.stringify(data.response.user) , { expires: 30 });
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
     <ToastProvider />
     
      <label htmlFor="__user_email">Email</label>
      <input
        type="text"
        name="email"
        id="__user_email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      
      <label htmlFor="__user_password">Password</label>
      <input
        type={show_password ? "text" : "password"}
        id="__user_password"
        value={formData.password}
        onChange={handleInputChange}
        name="password"
        placeholder="Password"
      />
      <button onClick={() => setShow_password(!show_password)}>
        {show_password ? "hide Password" : " show Password"}
      </button>

      <button onClick={submit_form}>Submit</button>
    </div>
  );
};

export default Login;
