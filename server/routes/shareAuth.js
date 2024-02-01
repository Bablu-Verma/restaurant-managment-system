import Express from "express";
import validUser from "../middleware/validUser.js";
import VerifyUser from "../middleware/VerifyUser.js";

import CheckSubscription from "../middleware/checkSubscription.js";
import { AddStoreEmployee, ListStoreEmployee, RemoveStoreEmployee, SearchToAddStoreEmployee } from "../controller/Employee/addEmployee.js";



const route = Express.Router();

route.post("/search-to-add-store-employee", validUser, VerifyUser, CheckSubscription, SearchToAddStoreEmployee);
route.post("/add-store-employee", validUser, VerifyUser, CheckSubscription,AddStoreEmployee );
route.post("/remove-store-employee", validUser, VerifyUser, CheckSubscription,RemoveStoreEmployee );
route.post("/list-store-employee", validUser, VerifyUser, CheckSubscription,ListStoreEmployee );

export default route;



