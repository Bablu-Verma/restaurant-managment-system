
import UserModel from "../../model/userModel.js"
import { decoded_token, generateToken } from "../../helper/smallFunction.js";
import sendOTP from "../../middleware/sendOTP.js";

 const resendOTPController = async (req, resp) => {
 
    const { authorization } = req.headers;
  
    try {
      
      const decoded = await decoded_token(authorization)
    
      const User = await UserModel.findOne({ _id: decoded.id });
  
      sendOTP(User._id);
      const token = await generateToken(User)
 
      resp.status(200).send({
        message: "Resend OTP success",
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


export default resendOTPController