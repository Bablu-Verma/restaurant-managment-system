import { decoded_token } from "../../helper/smallFunction.js";
import StoreModel from "../../model/storeModel.js";
import UserModel from "../../model/userModel.js";

const AddStoreController = async (req, resp) => {
  const {
    store_name,
    store_description,
    city,
    street,
    state,
    pin_code,
    country,
  } = req.body;
  const { authorization } = req.headers;

  const decoded = await decoded_token(authorization);

  // const User = await UserModel.findOne({ _id: decoded.id });

  const storeLogo = req.files.store_logo ? req.files.store_logo[0].path : null;
  const paymentQRImage = req.files.payment_receive_qr_image
    ? req.files.payment_receive_qr_image[0].path
    : null;

  if (!store_name) {
    return resp.status(401).send({
      message: "Enter Your Store Name",
      code: 0,
      status: 0,
    });
  }

  if (store_name.length <= 2) {
    return resp.status(401).send({
      message: "Enter Valid Store Name ",
      code: 0,
      status: 0,
    });
  }

  if (!store_description) {
    return resp.status(401).send({
      message: "Enter Your Store Declaration",
      code: 0,
      status: 0,
    });
  }

  if (store_description.length <= 19) {
    return resp.status(401).send({
      message: "Store Description minimum 20 characters",
      code: 0,
      status: 0,
    });
  }

  if (storeLogo == null) {
    return resp.status(401).send({
      message: "Add Your Store Logo",
      code: 0,
      status: 0,
    });
  }
  if (paymentQRImage == null) {
    return resp.status(401).send({
      message: "Add Your Any UPI Scanner Image, For reciving Money",
      code: 0,
      status: 0,
    });
  }

  if (!city) {
    return resp.status(401).send({
      message: "add your city",
      code: 0,
      status: 0,
    });
  }
  if (!street) {
    return resp.status(401).send({
      message: "add your street",
      code: 0,
      status: 0,
    });
  }
  if (!street) {
    return resp.status(401).send({
      message: "add your Country",
      code: 0,
      status: 0,
    });
  }
  if (!state) {
    return resp.status(401).send({
      message: "add your State",
      code: 0,
      status: 0,
    });
  }
  if (!pin_code) {
    return resp.status(401).send({
      message: "add your pin code",
      code: 0,
      status: 0,
    });
  }
  if (!(pin_code.length == 6)) {
    return resp.status(401).send({
      message: "add your valid pin code",
      code: 0,
      status: 0,
    });
  }

  const date = new Date();
  let start_time = date.getTime();

  date.setDate(date.getDate() + 30);
  let end_date = date.getTime();

  const address = {
    street, 
    city, 
    state, 
    pin_code, 
    country,
  }

  try {
    const newstore = new StoreModel({
      store_name,
      owner: decoded.id,
      store_logo: storeLogo,
      payment_receive_qr_image: paymentQRImage,
      store_description,
      subscription_start_date: start_time,
      subscription_end_date: end_date,
      address
    });

  const store = await newstore.save()
  
        await UserModel.findByIdAndUpdate(decoded.id, 
            { $push: { shops: store._id } },
            { new: true, useFindAndModify: false }
        );
    resp.status(201).send({
      message: "store created successfully",
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

export default AddStoreController;
