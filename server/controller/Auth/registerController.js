import { hashPassword, strongPassword, validateEmail } from "../../helper/smallFunction.js";
import UserModel from "../../model/userModel.js";


const registerController = async (req, resp) => {
    const { name, password, phone, email, gander } =
      req.body;

    let profile = null;
    if (req.file) {
      profile = req.file.filename;
    }
  
    if (!name) {
      return resp.status(401).send({
        message: "Enter Your Name",
        code: 0,
        status: 0,
      });
    }

    if (name.length <= 2) {
      return resp.status(401).send({
        message: "Name minimum 3 characters",
        code: 0,
        status: 0,
      });
    }
    if (!password) {
      return resp.status(401).send({
        message: "Please Enter Your Password",
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
   
    if (!gander) {
      return resp.status(401).send({
        message: "Chosse Your Gander",
        code: 0,
        status: 0,
      });
    }
    if (!phone) {
      return resp.status(401).send({
        message: " Enter Your Phone Number",
        code: 0,
        status: 0,
      });
    }
    if (!(phone.length == 10)) {
      return resp.status(401).send({
        message: " Enter Your Valid Phone Number, 10 digit Allowed",
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
   
    try {
      const userExist = await UserModel.findOne({ email });
      if (userExist) {
        return resp.status(401).send({
          message: "User Exist, Please Login Now",
          userEmail: email,
          code: 0,
          status: 0,
        });
      }
   
      const hashedPassword = await hashPassword(password)
      const User = new UserModel({
        name,
        password: hashedPassword,
        email,
        gander,
        profile,
        phone
      });
      
      const new_user = await User.save();
      resp.status(201).send({
        message: "User Created Successfully",
        code: 1,
        status: 1,
        user:{
         name: new_user.name,
         email: new_user.email,
         phone: new_user.phone
        }
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


  export default registerController