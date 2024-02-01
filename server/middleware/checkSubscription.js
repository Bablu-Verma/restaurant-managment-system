import StoreModel from "../model/storeModel.js";


const CheckSubscription = async (req, resp, next) => {
     const {store_id} = req.body
    //  console.log(req.body)


     if (!store_id) {
        return resp.status(401).send({
          message: "Add Store Id",
          code: 0,
          status: 0,
        });
      }

  try {

    const store = await StoreModel.findById(store_id);

    if(!store){
      return resp.status(401).send({
        message: " Store not found",
        code: 0,
        status: 0,
      });
    }


    if(store.subscription_type == 1  || store.subscription_type == 2){
        next();
    }

    if(store.subscription_type == 0 ){
        return resp.status(200).send({
            message: "Your Store is PENDING Status, Please Renew Your Subscription",
            code: 1,
            status: 1,
          });
    }
    if(store.subscription_type == 3 ){
        return resp.status(200).send({
            message: "Your Store is PAYMENT HOLD Status, Please Contact our Team,",
            code: 1,
            status: 1,
          });
    }
  } catch (error) {
    resp.status(500).send({
      message: "Server Error",
      code: 0,
      status: 0,
      error,
    });
  }
};
export default CheckSubscription;
