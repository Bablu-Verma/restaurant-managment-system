import UserModel from "../../model/userModel.js";

const searchUserController = async (req, resp) => {
  const { search, start_date, end_date, phone, user_id, gender } = req.body;

  if (!search && !start_date && !end_date && !phone && !user_id && !gender) {
    return resp.status(401).send({
      message: "Please provide a search criterion",
      code: 0,
      status: 0,
    });
  }

  try {
    let queryConditions = [];

    if (search) {
      queryConditions.push(
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      );
    }

    if (start_date || end_date) {
      let dateQuery = {};
      if (start_date) {
        dateQuery.$gte = new Date(start_date);
      }
      if (end_date) {
        dateQuery.$lte = new Date(end_date);
      }
      queryConditions.push({ createdAt: dateQuery });
    }

    if (phone) {
      queryConditions.push({ phone: { $regex: phoneNumber, $options: "i" } });
    }

    if (user_id) {
      queryConditions.push({ _id: user_id });
    }

    if (gender) {
      queryConditions.push({ gender: { $regex: gender, $options: "i" } });
    }

    const users = await UserModel.find({ $or: queryConditions });

    resp.status(200).send({
      message: "Search successfull",
      code: 1,
      status: 1,
      length: users.length,
      users: users,
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

export default searchUserController;
