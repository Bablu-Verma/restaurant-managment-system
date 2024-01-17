import { generateToken, validateEmail } from "../../helper/smallFunction.js";
import sendOTP from "../../middleware/sendOTP.js";
import UserModel from "../../model/userModel.js";



const requestForgotPasswordController = async (req, resp) => {

    const { email } = req.body;
  
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
  
    try {
      const User = await UserModel.findOne({ email });
      if (!User) {
        return resp.status(401).send({
          message: "Your Email is Not Match in our Server, Register Now",
          email: email,
          code: 0,
          status: 0,
        });
      }

      // send otp fun
      sendOTP(User._id);

      const token = await generateToken(User)
  
      return resp.status(200).send({
        message: "Send OTP in Your Email Successfully, Check Now",
        code: 1,
        status: 1,
        token
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


  export default requestForgotPasswordController

  