import { decoded_token } from "../../helper/smallFunction.js";
import UserModel from "../../model/userModel.js";



const getUserProfileController = async (req, resp) => {
    const { authorization } = req.headers;
    
    const decoded = await decoded_token(authorization)

    try {
      const User = await UserModel.findOne({ _id: decoded.id });
      
      resp.status(200).send({
        message: "get User Profile",
        code: 1,
        status: 1,
        user: User,
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


export default getUserProfileController