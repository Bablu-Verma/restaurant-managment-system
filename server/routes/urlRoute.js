import Express from "express";
import orderLandingController from "../controller/order/orderLanding.js";
import AddOrder from "../controller/order/addOrder.js";


const route = Express.Router();

route.get("/order", orderLandingController );
route.post("/add-order", AddOrder );






export default route;