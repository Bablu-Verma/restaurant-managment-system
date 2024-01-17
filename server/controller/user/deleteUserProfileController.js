import { compare_password, decoded_token } from "../../helper/smallFunction.js";
import UserModel from "../../model/userModel.js";

 const deleteUserProfileController = async (req, resp) => {
    const { authorization } = req.headers;
    const { password } = req.body;

    const decoded = await decoded_token(authorization)
  
    if (!password) {
      return resp.status(401).send({
        message: "Please Enter Your  Password",
        code: 0,
        status: 0,
      });
    }
  
    try {
      
      const User = await UserModel.findOne({ _id: decoded.id });
      if (!User) {
        return resp.status(401).send({
          message: "try again",
          code: 0,
          status: 0,
        });
      }
  
      const check_password = await compare_password(password, User.password)

      if(!check_password){
        return resp.status(401).send({
          message: "Your Password Not match, try to enter right password again",
          code: 0,
          status: 0,
        });
      }

      const deleteUser = await UserModel.deleteOne({ _id: decoded.id });

      return resp.status(200).send({
        message: "your Account deleted successfully",
        code: 1,
        status: 1,
        user: deleteUser
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


  export default deleteUserProfileController