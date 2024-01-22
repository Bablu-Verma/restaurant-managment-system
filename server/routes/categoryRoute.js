import Express from "express";
import AddCategoryController from "../controller/category/addCategory.js";
import validUser from "../middleware/validUser.js";
import VerifyUser from "../middleware/VerifyUser.js";
import CheckSubscription from "../middleware/checkSubscription.js";
import ListCategoryController from "../controller/category/listCategory.js";
import DeleteCategoryController from "../controller/category/deleteCategory.js";



const route = Express.Router();

route.post("/add-category", validUser, VerifyUser, CheckSubscription, AddCategoryController );
route.post("/list-category", validUser, VerifyUser, CheckSubscription, ListCategoryController );
route.post("/delete-category", validUser, VerifyUser, CheckSubscription, DeleteCategoryController );



export default route;