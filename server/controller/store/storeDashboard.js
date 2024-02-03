
import StoreModel from "../../model/storeModel.js";

const StoreDashboard = async (req, resp) => {

  const {store_id} = req.body;

  if(!store_id){
    return resp.status(401).send({
        message: "Add Store Id",
        code: 0,
        status: 0,
      });
}
  
  try {
    const store = await StoreModel.findById(store_id)
   
    if(!store){
      return resp.status(401).send({
          message: "store not found try again",
          error: 1,
          status: 0,
        });
  }
  const currentDate = new Date();
  const subscriptionEndDate = new Date(store.subscription_end_date);

  const isExpiringSoon = subscriptionEndDate < new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000);

    resp.status(201).send({
      message: "store dashboard",
      code: 1,
      status: 1,
      expiring: isExpiringSoon ? 1 : 0,
      store
      
    });
  } catch (error) {
    resp.status(500).send({
      message: "Server Error",
      code: 0,
      status: 0,
      error,
    });
  }
};

export default StoreDashboard;
