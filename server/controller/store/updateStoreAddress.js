import { decoded_token } from "../../helper/smallFunction.js";
import StoreModel from "../../model/storeModel.js";

const updateStoreAddress = async (req, resp) => {
  const { storeId, street, city, state, pin_code, country } = req.body;

  const { authorization } = req.headers;

  const decoded = await decoded_token(authorization);

  if (!storeId) {
    return resp.status(401).send({
      message: "Add Store Id",
      code: 0,
      status: 0,
    });
  }

  try {
    const store = await StoreModel.findById(storeId);

    if (!(store.owner == decoded.id)) {
      return resp.status(401).send({
        message: "you are not allowed to update this store",
        code: 0,
        status: 0,
      });
    }

    if (street) {
      store.address.street = street;
    }
    if (city) {
      store.address.city = city;
    }
    if (state) {
      store.address.state = state;
    }
    if (pin_code) {
      store.address.pin_code = pin_code;
    }
    if (country) {
      store.address.country = country;
    }

    const update_store = await store.save();

    resp.status(200).send({
      message: "Store Address Update Successfully",
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

export default updateStoreAddress;
