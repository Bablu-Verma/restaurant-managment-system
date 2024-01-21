import { checkValidTime, decoded_token, generateToken } from "../../helper/smallFunction.js";
import sendOTP from "../../middleware/sendOTP.js";
import StoreModel from "../../model/storeModel.js";
import UserModel from "../../model/userModel.js";

export const StoreDeleteRequest = async (req, resp) => {
 
  const { authorization } = req.headers;
  const { storeid } = req.body;

  const decoded = await decoded_token(authorization);

  if (!storeid) {
    return resp.status(401).send({
      message: "Please provide store id",
      code: 0,
      status: 0,
    });
  }

  try {

    const User = await UserModel.findById(decoded.id);

    const store = await StoreModel.findById(storeid)
    if (!store) {
        return resp.status(401).send({
          message: "Store Not Found, try again",
          code: 0,
          status: 0,
        });
      }

    // send otp fun
    sendOTP(User._id);

    const token = await generateToken(User)
 
    resp.status(200).send({
      message: "Verify To Delete",
      code: 1,
      status: 1,
      store,
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

 
export const storeDeleteVerify = async (req, resp)=>{
  const { authorization } = req.headers;
  const { storeid } = req.body;

  const decoded = await decoded_token(authorization);


  // console.log(otp);

  if (!storeid) {
    return resp.status(401).send({
      message: "Add Store id",
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
}