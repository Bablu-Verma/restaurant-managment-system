import { decoded_token } from "../../helper/smallFunction.js";
import StoreModel from "../../model/storeModel.js";

const GetStoreDetailsController = async (req, resp) => {
 
  const { authorization } = req.headers;
  const { storeid } = req.body;

  const decoded = await decoded_token(authorization);

  if (!storeid) {
    return resp.status(401).send({
      message: "Please provide store id",
      code: 0,
      status: 0,
    });
  }

  try {
    const store = await StoreModel.findById(storeid)

    if (!store) {
        return resp.status(401).send({
          message: "Store Not Found, try again",
          code: 0,
          status: 0,
        });
      }

    resp.status(201).send({
      message: "store Details get successfully",
      code: 1,
      status: 1,
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

export default GetStoreDetailsController;
