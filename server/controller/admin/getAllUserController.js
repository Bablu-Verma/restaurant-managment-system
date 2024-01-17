import UserModel from "../../model/userModel.js";


 const getAllUserController = async (req, resp) => {

    try {

      const User = await UserModel.find({roll : 0});

      resp.status(200).send({
        message: " All User",
        code: 1,
        status: 1,
        length: User.length,
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


  export default  getAllUserController
