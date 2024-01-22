import StoreModel from "../../model/storeModel.js";

const orderLandingController = async (req, resp) =>{
  
    const storeId = req.query.store
    const tableKey = req.query.table

  try {

    const store = await StoreModel.findById(storeId)
    resp.status(200).send({
        message: "get landing page",
        code: 1,
        status: 1,
        store:{
            name: store.store_name,
            logo: store.store_logo
        }
      });
  } catch (error) {
    resp.status(500).send({
        message: "Server Error",
        code: 0,
        status: 0,
        error,
      });
  }
}

export default orderLandingController