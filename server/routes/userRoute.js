import Express from "express";
import getUserProfileController from "../controller/user/getUserProfileController.js";
import validUser from "../middleware/validUser.js";
import changePasswordController from "../controller/user/changePasswordController.js";
import deleteUserProfileController from "../controller/user/deleteUserProfileController.js";
import updateUserController from "../controller/user/updateUserController.js";
import uploadImage from '../middleware/uploadImage.js'
import updateProfileController from "../controller/user/updateProfileController.js";
import checkAdmin from "../middleware/checkAdmin.js";
import getAllUserController from "../controller/admin/getAllUserController.js";
import searchUserController from "../controller/admin/searchUserController.js";
import adminDeleteUserAccount from "../controller/admin/adminDeleteUserAccount.js";
import getUserProfileByAdmin from "../controller/admin/getUserProfileByAdmin.js";


const route = Express.Router();



route.get("/user-profile",validUser, getUserProfileController);
route.post("/update-user", validUser, uploadImage.single('profile'), updateUserController);
route.post("/update-user-profile", validUser, uploadImage.single('profile'), updateProfileController);
route.post("/change-password",validUser, changePasswordController);
route.post("/delete-user-profile",validUser, deleteUserProfileController);


// admin 

route.get("/get-all-user",validUser,checkAdmin, getAllUserController);
route.post("/search-user",validUser,checkAdmin, searchUserController);
route.post("/admin-delete-user-account",validUser,checkAdmin, adminDeleteUserAccount);
route.post("/get-user-profile-by-admin",validUser,checkAdmin, getUserProfileByAdmin);

export default route;
