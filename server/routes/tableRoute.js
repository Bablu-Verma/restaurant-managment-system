import Express from "express";
import validUser from "../middleware/validUser.js";

import VerifyUser from "../middleware/VerifyUser.js";
import AddTable from "../controller/table/addTable.js";
import { TableDetailController, TableListController } from "../controller/table/getTable.js";
import deleteTableController from "../controller/table/deleteTable.js";




const route = Express.Router();

route.post("/add-table", validUser, VerifyUser, AddTable);
route.post("/table-list", validUser, VerifyUser, TableListController);
route.post("/table-detail", validUser, VerifyUser, TableDetailController);
route.post("/delete-table", validUser, VerifyUser, deleteTableController);


export default route;



