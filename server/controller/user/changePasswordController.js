import { compare_password, decoded_token, hashPassword, strongPassword } from "../../helper/smallFunction.js";
import UserModel from "../../model/userModel.js";




 const changePasswordController = async (req, resp) => {
    const { authorization } = req.headers;
    const { oldPassword, newPassword } = req.body;

    const decoded = await decoded_token(authorization)
  
    if (!oldPassword) {
      return resp.status(401).send({
        message: "Please Enter Your  Password",
        code: 0,
        status: 0,
      });
    }
  
    if (!newPassword) {
      return resp.status(401).send({
        message: "Please Enter Your  New Password",
        code: 0,
        status: 0,
      });
    }
  
    if (!(strongPassword(newPassword))) {
      return resp.status(401).send({
        message: "Enter strong password, At least 8 characters, one uppercase letter, one lowercase letter, one digit and one special character",
        code: 0,
        status: 0,
      });
    }
  
    const User = await UserModel.findOne({ _id: decoded.id });

    if (!User) {
      return resp.status(401).send({
        message: "try again",
        code: 0,
        status: 0,
      });
    }
  
    try {

      const check_password = await compare_password(oldPassword, User.password)
      
      if(!check_password){
        return resp.status(401).send({
          message: "Your old Password Not match, try to enter right password again",
          code: 0,
          status: 0,
        });
      }

      const hashedPassword = await hashPassword(newPassword)

      await  UserModel.findByIdAndUpdate(decoded.id, {password:hashedPassword}, { new: true });

      resp.status(200).send({
        message: "password Change Successfully, Login To New Password",
        code: 1,
        status: 1,
        user: {
          name: User.name,
          email:User.email,
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

  export default changePasswordController