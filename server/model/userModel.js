import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, " Name is require"],
    },
    email: {
      type: String,
      required: [true, " Email is require"],
      unique: true,
    },
    phone: {
      type: Number,
      required: [true, " Phone is require"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, " Password is require"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: [true, " Gender is require"],
    },
    role: {
      type: Number,
      enum: [0, 1], // 1 ADMIN , 0 USER'
      default: 0,
    },
    profile: {
      type: String,
    },

    shops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Store" }],

    otp: {
      type: String,
      default: null,
    },
    verify: {
      type: Number,
      enum: [0, 1], //  0 user not verify, 1 user verify
      default: 0,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
