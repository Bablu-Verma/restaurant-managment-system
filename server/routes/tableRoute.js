import Express from "express";
import validUser from "../middleware/validUser.js";

import VerifyUser from "../middleware/VerifyUser.js";
import AddTable from "../controller/table/addTable.js";
import { TableDetailController, TableListController } from "../controller/table/getTable.js";
import deleteTableController from "../controller/table/deleteTable.js";
import CheckSubscription from "../middleware/checkSubscription.js";




const route = Express.Router();

route.post("/add-table", validUser, VerifyUser,CheckSubscription, AddTable);
route.post("/table-list", validUser, VerifyUser,CheckSubscription, TableListController);
route.post("/table-detail", validUser, VerifyUser,CheckSubscription, TableDetailController);
route.post("/delete-table", validUser, VerifyUser,CheckSubscription, deleteTableController);


export default route;



