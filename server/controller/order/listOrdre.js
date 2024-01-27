
import OrderModel from "../../model/orderModel.js";


export const OrderListController = async (req, resp) => {
  const { store_id } = req.body;

  if (!store_id) {
    return resp.status(401).send({
      message: "Add Store Id",
      code: 0,
      status: 0,
    });
  }

  try {
    const order = await OrderModel.find({ store_id });

    if (order.length == 0) {
      return resp.status(200).send({
        message: "No order found",
        code: 1,
        status: 1,
      });
    }

    resp.status(200).send({
      message: "get order List successfully",
      code: 1,
      status: 1,
      order_length: order.length,
      order,
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


export const GetOneOrderController = async (req, resp) => {
    const { store_id, order_id } = req.body;
  
    if (!order_id) {
      return resp.status(401).send({
        message: "Add Order Id",
        code: 0,
        status: 0,
      });
    }
  
    try {
      const order = await OrderModel.findOne({ store_id, _id:order_id });
  
      if (!order) {
        return resp.status(200).send({
          message: "order not found",
          code: 1,
          status: 1,
        });
      }
  
      resp.status(200).send({
        message: "get order Detail successfully",
        code: 1,
        status: 1,
        order,
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


  export const DeleteOrderController = async (req, resp) => {
    const { store_id, order_id } = req.body;
  
    if (!order_id) {
      return resp.status(401).send({
        message: "Add Order Id",
        code: 0,
        status: 0,
      });
    }
  
    try {
      const order = await OrderModel.findOne({ store_id, _id:order_id });
  
      if (!order) {
        return resp.status(200).send({
          message: "order not found",
          code: 1,
          status: 1,
        });
      }
  

      const delete_order = await OrderModel.findByIdAndRemove(order_id) 

      resp.status(200).send({
        message: "order delete successfully",
        code: 1,
        status: 1,
        delete_order
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
  
  
  