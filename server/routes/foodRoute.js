import Express from "express";
import uploadImage from "../middleware/uploadImage.js";
import validUser from "../middleware/validUser.js";
import VerifyUser from "../middleware/VerifyUser.js";
import CheckSubscription from "../middleware/checkSubscription.js";
import AddFood from "../controller/food/addFood.js";
import ListFood from "../controller/food/listFood.js";
import DeleteFood from "../controller/food/deleteFood.js";
import UpdateFood from "../controller/food/updateFood.js";



const route = Express.Router();

route.post("/add", validUser, VerifyUser, CheckSubscription, uploadImage.single('image_url'), AddFood );
route.post("/list-food", validUser, VerifyUser, CheckSubscription, ListFood );
route.post("/delete-food", validUser, VerifyUser, CheckSubscription, DeleteFood );
route.post("/update-food", validUser, VerifyUser, CheckSubscription,uploadImage.single('image_url'), UpdateFood );


export default route;