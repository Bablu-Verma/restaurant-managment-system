
import { decoded_token } from "../../helper/smallFunction.js";
import StoreModel from "../../model/storeModel.js";


const updateStore = async (req, resp) => {
  const { storeId, store_name, store_description } = req.body;
  const { authorization } = req.headers;

  const decoded = await decoded_token(authorization);

  const storeLogo = req.files.store_logo ? req.files.store_logo[0].path : null;
  const paymentQRImage = req.files.payment_receive_qr_image
    ? req.files.payment_receive_qr_image[0].path
    : null;

    if(!storeId){
        return resp.status(401).send({
            message: "Add Store Id",
            code: 0,
            status: 0,
          });
    }


  try {

    const store = await StoreModel.findById(storeId);


    if(!(store.owner == decoded.id)){
        return resp.status(401).send({
            message: "you are not allowed to update this store",
            code: 0,
            status: 0,
          });
    }
    

    if (store_name) {
      store.store_name = store_name;
    }
    if(store_description){
        store.store_description = store_description;
    }
    if(storeLogo){
        store.store_logo = storeLogo;
    }
    if(paymentQRImage){
        store.payment_receive_qr_image = paymentQRImage;
    }


  const  update_store = await store.save()

  resp.status(200).send({
    message: "Store Update Successfully",
    code: 1,
    status: 1,
    update: update_store,
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

export default updateStore;
