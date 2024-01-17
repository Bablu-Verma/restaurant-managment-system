import UserModel from "../../model/userModel.js";

import { compare_password, generateToken, validateEmail } from "../../helper/smallFunction.js";

const loginController = async (req, resp) => {
    const { password, email } = req.body;
  
    if (!password) {
      return resp.status(401).send({
        message: "Please Enter Your Password",
        code: 0,
        status: 0,
      });
    }
  
    if (!email) {
      return resp.status(401).send({
        message: " Enter Your Email",
        code: 0,
        status: 0,
      });
    }
 
    if (!validateEmail(email)) {
      return resp.status(401).send({
        message: " Enter Your Valid Email",
        code: 0,
        status: 0,
      });
    }
  
    const User = await UserModel.findOne({ email });
    if (!User) {
      return resp.status(401).send({
        message: "Your Email is Not Match in our Server, Register Now",
        email: email,
        code: 0,
        status: 0,
      });
    }
  
    try {

      const check_password = await compare_password(password, User.password)
      if(!check_password){
        return resp.status(401).send({
          message: "Your Email and Password Not match",
          code: 0,
          status: 0,
        });
      }

      const token = await generateToken(User)

      resp.status(201).send({
        message: "User Login Successfully",
        code: 1,
        status: 1,
        user: {
          name: User.name,
          email: User.email,
          profile_url: User.profile,
          token,
        },
      });

    } catch (error) {
      resp.status(500).send({
        message: "Server Error",
        code: 0,
        status: 0,
        error,
      });
    }
  };
  

  export default loginController