"use client";

import React, { useState } from "react";
import axios from "axios";
import { register_api } from "@/service/APIs";
import toast, { Toaster } from "react-hot-toast";
import ToastProvider from "@/components/ToastProvider";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    profile: null,
  });
  const [show_password, setShow_password] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? e.target.files[0] : value,
    });
  };

  const submit_form = async () => {
    // console.log(formData);

    if (formData.name == "") {
      return toast.error("Enter your name");
    }
    if (formData.email == "") {
        return toast.error("Enter your email");
    }
    if (formData.phone == "") {
        return toast.error("Enter your phone number");
    }
    if (formData.password == "") {
        return toast.error("Enter your Password");
    }
    if (formData.gender == "") {
        return toast.error("Add your gender");
    }

    try {
      const { data } = await axios.post(
        register_api,

        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          gender: formData.gender,
          profile: formData.profile,
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
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
     <ToastProvider />
      <label htmlFor="__user_name">Name</label>
      <input
        type="text"
        id="__user_name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        name="name"
      />
      <label htmlFor="__user_email">Email</label>
      <input
        type="text"
        name="email"
        id="__user_email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <label htmlFor="__user_phone">Phone</label>
      <input
        type="number"
        name="phone"
        id="__user_phone"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="Phone"
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
        {" "}
        {show_password ? "hide Password" : " show Password"}
      </button>
      <label htmlFor="__user_profile">Profile</label>
      <input
        type="file"
        name="profile"
        onChange={handleInputChange}
        id="__user_profile"
        placeholder="Profile"
      />

      <input
        type="radio"
        id="__user_gender_male"
        value="Male"
        name="gender"
        checked={formData.gender === "Male"}
        onChange={handleInputChange}
      />
      <label htmlFor="__user_gender_male">Male</label>

      <input
        type="radio"
        id="__user_gender_female"
        name="gender"
        checked={formData.gender === "Female"}
        onChange={handleInputChange}
        value="Female"
      />
      <label htmlFor="__user_gender_female">Female</label>

      <input
        type="radio"
        id="__user_gender_other"
        value="Other"
        name="gender"
        checked={formData.gender === "Other"}
        onChange={handleInputChange}
      />
      <label htmlFor="__user_gender_other">Other</label>

      <button onClick={submit_form}>Submit</button>
    </div>
  );
};

export default Register;
