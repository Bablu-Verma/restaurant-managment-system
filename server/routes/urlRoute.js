import Express from "express";
import orderLandingController from "../controller/order/orderLanding.js";


const route = Express.Router();

route.get("/order", orderLandingController );






export default route;