import Jwt from "jsonwebtoken";
import UserModel from "../model/userModel.js";

const validUser = async (req, resp, next) => {
  const { authorization } = req.headers;

  if(!authorization){
    return resp.status(401).send({
      message: "Please provide  Authoriz, & try again",
      code: 0,
      status: 0,
    });
  }

  
   try {

    const decoded = Jwt.verify(authorization, process.env.SECRETKEY);

    if (!decoded) {
      return resp.status(401).send({
        message: "User Not Authoriz",
        code: 0,
        status: 0,
      });
    }
   
    const user = await UserModel.findOne({ _id: decoded.id });

    if (!user) {
      return resp.status(401).send({
        message: "User Not Authoriz",
        code: 0,
        status: 0,
      });
    }

    next();
  } catch (error) {
    resp.status(500).send({
      message: "Server Error",
      code: 0,
      status: 0,
      error,
    });
  }
};
export default validUser;
