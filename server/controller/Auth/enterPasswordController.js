import { strongPassword, hashPassword, decoded_token} from "../../helper/smallFunction.js";
import UserModel from "../../model/userModel.js";

const forgotPasswordController = async (req, resp) => {
    const { password } = req.body;
    const { authorization } = req.headers;
   
    if (!password) {
      return resp.status(401).send({
        message: "Please Enter Your New Password",
        code: 0,
        status: 0,
      });
    }

    if (!(strongPassword(password))) {
      return resp.status(401).send({
        message: "Enter strong password, At least 8 characters, one uppercase letter, one lowercase letter, one digit and one special character",
        code: 0,
        status: 0,
      });
    }

    try {
  
      const decoded = await decoded_token(authorization)
    

      const token_time = decoded.time 
      const add10min = token_time + 10 * 60 * 1000;
      const gat_date = new Date();
      const current_time = gat_date.getTime()

      if( add10min <= current_time){
        return resp.status(401).send({
          message: "Password change with in 10 min in enter otp, try again",
          code: 0,
          status: 0,
        });
      }
    
      const User = await UserModel.findById(decoded.id);

      const hashedPassword = await hashPassword(password)

      const update_user = await  UserModel.findByIdAndUpdate(User.id, {password:hashedPassword}, { new: true });
      
   
      console.log(update_user);
  
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


export default forgotPasswordController