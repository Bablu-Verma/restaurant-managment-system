
import UserModel from "../../model/userModel.js"
import { decoded_token, generateToken } from "../../helper/smallFunction.js";

 const forgotPasswordOTPController = async (req, resp) => {
    const { otp } = req.body;
    const { authorization } = req.headers;

    if (!otp) {
      return resp.status(401).send({
        message: "Enter Your OTP",
        code: 0,
        status: 0,
      });
    }

    if (!otp.length == 4) {
      return resp.status(401).send({
        message: "Enter Your 4 Digit OTP",
        code: 0,
        status: 0,
      });
    }

    try {
      
      const decoded = await decoded_token(authorization)
    
      const user = await UserModel.findOne({ _id: decoded.id });
  
      
      const token_time = decoded.time 
      const add10min = token_time + 10 * 60 * 1000;
      const gat_date = new Date();
      const current_time = gat_date.getTime()

      if( add10min <= current_time){
        return resp.status(401).send({
          message: "OTP Valid only 10 Min, Resend OTP",
          code: 0,
          status: 0,
        });
      }

      if (user.otp != otp) {
        return resp.status(401).send({
          message: "OTP Not Valid, Check OTP",
          code: 0,
          status: 0,
        });
      }

      const token = await generateToken(user)
 
      resp.status(200).send({
        message: "OTP Verified Success",
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


export default forgotPasswordOTPController