import Express from "express";
import validUser from "../middleware/validUser.js";
import AddStore from "../controller/store/addStore.js";
import uploadImage from "../middleware/uploadImage.js";

const route = Express.Router();



route.post("/add-store", validUser, uploadImage.single('store_logo'), AddStore );



export default route;
