import Express from "express";
import { DeleteOrderController, GetOneOrderController, OrderListController } from "../controller/order/listOrdre.js";
import validUser from "../middleware/validUser.js";
import VerifyUser from "../middleware/VerifyUser.js";
import CheckSubscription from "../middleware/checkSubscription.js";
import UpdateOrderStatus from "../controller/order/updateOrderStatus.js";


const route = Express.Router();

route.post("/order-list",  validUser, VerifyUser,CheckSubscription,  OrderListController);
route.post("/order-detail",  validUser, VerifyUser,CheckSubscription,  GetOneOrderController);
route.post("/order-delete",  validUser, VerifyUser,CheckSubscription,  DeleteOrderController);
route.post("/update-order-status",  validUser, VerifyUser,CheckSubscription,  UpdateOrderStatus);



export default route;