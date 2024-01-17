import Express from "express";

import uploadImage from "../middleware/uploadImage.js";
import registerController from "../controller/Auth/registerController.js";
import loginController from "../controller/Auth/loginController.js";
import requestForgotPasswordController from "../controller/Auth/requestForgotPasswordController.js";
import forgotPasswordOTPController from "../controller/Auth/forgotPasswordOTPController.js";
import validUser from "../middleware/validUser.js";
import forgotPasswordController from "../controller/Auth/enterPasswordController.js";
import resendOTPController from "../controller/Auth/resendOTP.js";

const route = Express.Router();

route.post("/register", uploadImage.single('profile'), registerController);
route.post("/login",loginController );
route.post("/request-forgot-password", requestForgotPasswordController);
route.post("/forgot-password-enter-otp", validUser, forgotPasswordOTPController);
route.post("/add-new-password", validUser, forgotPasswordController);
route.post("/resend-otp", validUser, resendOTPController);


export default route;
