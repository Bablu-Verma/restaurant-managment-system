import UserModel from "../../model/userModel.js";


 const getUserProfileByAdmin = async (req, resp) => {

    const {userId} = req.body

    if (!userId) {
        return resp.status(401).send({
          message: "Please provide user id",
          code: 0,
          status: 0,
        });
      }

    try {

        const User = await UserModel.findOne({ _id: userId });

        if (!User) {
            return resp.status(401).send({
              message: "user not exist",
              code: 0,
              status: 0,
            });
          }
      
      resp.status(200).send({
        message: "User profile",
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


  export default  getUserProfileByAdmin
