
import UserModel from "../model/userModel.js";
import { decoded_token } from "../helper/smallFunction.js";

const CheckAdmin = async (req, resp, next) => {
  const { authorization } = req.headers;

  const decoded =  await decoded_token(authorization)

  try {
    const user = await UserModel.findOne({ _id: decoded.id });
  
    if(!user.roll == 1){
        return resp.status(401).send({
            message: "Not Authoriz, Don't Access This Page",
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
export default CheckAdmin;
