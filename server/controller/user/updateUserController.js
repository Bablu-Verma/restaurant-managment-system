import { decoded_token } from "../../helper/smallFunction.js";
import UserModel from "../../model/userModel.js";

const updateUserController = async (req, resp) => {
  const { authorization } = req.headers;
  const { name, gander } = req.body;

  const decoded = await decoded_token(authorization);

  let profile = null;
  if (req.file) {
    profile = req.file.filename;
  }

  // console.log(req.body, profile);
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

  if (!gander) {
    return resp.status(401).send({
      message: "Chosse Your Gander",
      code: 0,
      status: 0,
    });
  }

  try {
    if (profile == null) {
      let updates = { name, gander };
      const updatedDocument = await UserModel.findByIdAndUpdate(
        decoded.id,
        updates,
        { new: true }
      );

      resp.status(200).send({
        message: "User Update Successfully",
        code: 1,
        status: 1,
        user: updatedDocument,
      });
    } else {
      let updates = { name, gander, profile };
      const updatedDocument = await UserModel.findByIdAndUpdate(
        decoded.id,
        updates,
        { new: true }
      );
      resp.status(200).send({
        message: "User Update Successfully",
        code: 1,
        status: 1,
        user: updatedDocument,
      });
    }
  } catch (error) {
    resp.status(500).send({
      message: "Server Error",
      code: 0,
      status: 0,
      error,
    });
  }
};

export default updateUserController;
