import { decoded_token } from "../../helper/smallFunction.js";
import StoreModel from "../../model/storeModel.js";

const StoreListController = async (req, resp) => {
 
  const { authorization } = req.headers;

  const decoded = await decoded_token(authorization);
  
  try {
    const store = await StoreModel.find({owner:decoded.id})

    resp.status(201).send({
      message: "store List successfully",
      code: 1,
      status: 1,
      total_store : store.length,
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

export default StoreListController;
