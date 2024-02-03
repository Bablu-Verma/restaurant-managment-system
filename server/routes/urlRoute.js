import Express from "express";
import orderLandingController from "../controller/order/orderLanding.js";
import AddOrder from "../controller/order/addOrder.js";
import { initiate_order_upi_payment, order_upi_payment_callback } from "../controller/order/orderPayment.js";


const route = Express.Router();

route.get("/order", orderLandingController );
route.post("/add-order", AddOrder );

route.post("/initiate-order-upi-payment", initiate_order_upi_payment );
route.post('/order-upi-payment-callback',order_upi_payment_callback);


export default route;