import Express from "express";
import validUser from "../middleware/validUser.js";
import uploadImage from "../middleware/uploadImage.js";
import AddStoreController from "../controller/store/addStore.js";
import VerifyUser from "../middleware/VerifyUser.js";
import StoreListController from "../controller/store/listStore.js";
import GetStoreDetailsController from "../controller/store/getStoreDetails.js";
import { StoreDeleteRequest, storeDeleteVerify } from "../controller/store/deleteStore.js";
import updateStore from "../controller/store/updateStore.js";
import updateStoreAddress from "../controller/store/updateStoreAddress.js";
import StoreDashboard from "../controller/store/storeDashboard.js";
import CheckSubscription from "../middleware/checkSubscription.js";


const route = Express.Router();


// owner 

route.post("/add-store", validUser, VerifyUser, uploadImage.fields([
    { name: 'store_logo', maxCount: 1 }
]), AddStoreController );

route.get("/store-list", validUser, VerifyUser, StoreListController );
route.post("/get-store-details", validUser, VerifyUser,  GetStoreDetailsController);
route.post("/store-delete-request", validUser, VerifyUser, StoreDeleteRequest);
route.post("/store-delete-verify", validUser, VerifyUser, storeDeleteVerify);
route.post("/update-store", validUser, VerifyUser, CheckSubscription,uploadImage.fields([
    { name: 'store_logo', maxCount: 1 }, 
]), updateStore);
route.post("/update-store-address", validUser, VerifyUser,updateStoreAddress);
route.post("/store-dashboard", validUser, VerifyUser,CheckSubscription, StoreDashboard);



export default route;



