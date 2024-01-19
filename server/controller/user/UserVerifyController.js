import { checkValidTime, decoded_token, generateToken } from "../../helper/smallFunction.js";
import sendOTP from "../../middleware/sendOTP.js";
import UserModel from "../../model/userModel.js";

export const UserVerifyRequest = async (req, resp) => {
  const { authorization } = req.headers;

  const decoded = await decoded_token(authorization);

  try {
    const User = await UserModel.findById(decoded.id);
    if (!User) {
      return resp.status(401).send({
        message: "Login again",
        code: 0,
        status: 0,
      });
    }

    // send otp fun
    sendOTP(decoded.id);

    console.log(User);

    const token = await generateToken(User);

    console.log(User);

    return resp.status(200).send({
      message: "Send OTP in Your Email Successfully, Check Now",
      code: 1,
      status: 1,
      token,
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

export const UserVerifyGetOTP = async (req, resp) => {
  const { authorization } = req.headers;
  const { otp } = req.body;

  const decoded = await decoded_token(authorization);
  // console.log(otp);

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
    const User = await UserModel.findById(decoded.id);
    if (!User) {
      return resp.status(401).send({
        message: "Login again",
        code: 0,
        status: 0,
      });
    }

    const check_time = checkValidTime(decoded.time)

    if(!check_time){
      return resp.status(401).send({
        message: "OTP Valid only 10 Min, Resend OTP",
        code: 0,
        status: 0,
      });
  
    }


   

    if (User.otp != otp) {
      return resp.status(401).send({
        message: "OTP Not Valid, Check OTP",
        code: 0,
        status: 0,
      });
    }

    User.verify = 1;
    await User.save();

    return resp.status(200).send({
      message: "User verifie Successfully",
      code: 1,
      status: 1,
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
