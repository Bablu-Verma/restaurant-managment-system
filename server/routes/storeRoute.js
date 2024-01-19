import Express from "express";
import validUser from "../middleware/validUser.js";
import uploadImage from "../middleware/uploadImage.js";
import AddStoreController from "../controller/store/addStore.js";
import VerifyUser from "../middleware/VerifyUser.js";

const route = Express.Router();

route.post("/add-store", validUser, VerifyUser, uploadImage.fields([
    { name: 'store_logo', maxCount: 1 }, 
    { name: 'payment_receive_qr_image', maxCount: 1 }
]), AddStoreController );



export default route;



