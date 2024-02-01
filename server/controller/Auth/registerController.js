import { hashPassword, strongPassword, validateEmail } from "../../helper/smallFunction.js";
import UserModel from "../../model/userModel.js";


const registerController = async (req, resp) => {
    const { name, password, phone, email, gender } =
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
   
    if (!gender) {
      return resp.status(401).send({
        message: "Chosse Your gender",
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
      const checkEmailExist = await UserModel.findOne({ email });
      if (checkEmailExist) {
        return resp.status(401).send({
          message: "Email is use, Please Login Now",
          userEmail: email,
          code: 0,
          status: 0,
        });
      }
      const checkPhoneExist = await UserModel.findOne({ phone });
      
      if (checkPhoneExist) {
        return resp.status(401).send({
          message: `This phone number is use another email address, use another phone number`,
          phone: phone,
          code: 0,
          status: 0,
        });
      }
   
      const hashedPassword = await hashPassword(password)
      const User = new UserModel({
        name,
        password: hashedPassword,
        email,
        gender,
        profile,
        phone
      });
      
      const new_user = await User.save();
      resp.status(201).send({
        message: "User Created Successfully",
        error: 0,
        status: 1,
        response:{
          user:new_user
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