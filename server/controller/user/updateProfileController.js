import { decoded_token } from "../../helper/smallFunction.js";
import UserModel from "../../model/userModel.js";

const updateProfileController = async (req, resp) => {
    
  const { authorization } = req.headers;

  const decoded = await decoded_token(authorization);

  let profile = null;
  if (req.file) {
    profile = req.file.filename;
  }

  if(profile == null){
    return resp.status(401).send({
        message: "Please chosse profile image",
        code: 0,
        status: 0,
      });
  }


  try {

      const updatedDocument = await UserModel.findByIdAndUpdate(
        decoded.id,
        profile,
        { new: true }
      );
      resp.status(200).send({
        message: "User Profile Update Successfully",
        code: 1,
        status: 1,
        user: updatedDocument,
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

export default updateProfileController;
