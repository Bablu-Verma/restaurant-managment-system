import mongoose from "mongoose";
import color from "colors";

const connsectDB = async (DB_URL) => {
  try {
    await mongoose.connect(DB_URL);
    console.log(`Database Connecte Successfully`.bgMagenta);
  } catch (error) {
    console.log(error);
  }
};

export default connsectDB;
