

import OrderModel from "../../model/orderModel.js";

const UpdateOrderStatus = async (req, resp) => {
  const { order_id, store_id, order_status } = req.body;

  if (!order_id) {
    return resp.status(401).send({
      message: "Add Order I d",
      code: 0,
      status: 0,
    });
  }

  if (!order_status) {
    return resp.status(401).send({
      message: "Add Update Order status",
      code: 0,
      status: 0,
    });
  }

try {

    const order = await OrderModel.findOne({ store_id, _id:order_id });

    if (!order) {
        return resp.status(401).send({
          message: "order not found",
          code: 0,
          status: 0,
        });
      }

    order.status = order_status

    order.save();


    resp.status(201).send({
      message: "order status update successfully",
      code: 1,
      status: 1,
      order
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

export default UpdateOrderStatus;
