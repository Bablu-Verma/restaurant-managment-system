import nodemailer from "nodemailer";
import UserModel from "../model/userModel.js";

const sendOTP = async (userId) => {

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "marie57@ethereal.email",
      pass: "f5mw6vzn4aw3jJbkav",
    },
  });

  const OTP = Math.floor(Math.random() * 9000 + 1000);

  const user = await UserModel.findById(userId)

  user.otp = OTP;

  await user.save();

  transporter.sendMail({
    from: "restaurant@managmentsystem.com",
    to: user.email,
    subject: " OTP ",
    text: ` Dear ${user.name},
    Your otp is ${OTP} `,
  });


};

export default sendOTP;