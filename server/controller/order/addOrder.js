

import OrderModel from "../../model/orderModel.js";



const AddOrder = async (req, resp) => {
  const { foods, store_id, table_number, amount } = req.body;

  if (!foods || !Array.isArray(foods) || foods.length === 0) {
    return resp.status(401).send({
      message: "Add at least one food item",
      code: 0,
      status: 0,
    });
  }

  
  if (!table_number) {
    return resp.status(401).send({
      message: "Add food description",
      code: 0,
      status: 0,
    });
  }
  if (!store_id) {
    return resp.status(401).send({
      message: "Add Store Id",
      code: 0,
      status: 0,
    });
  }

try {


const calculatedAmount = foods.reduce((sum, item) => sum + item.total_price, 0);

if (calculatedAmount !== amount) {
    return resp.status(400).send({ message: "Calculated amount does not match provided amount." });
}

const new_order = new OrderModel({
    foods, store_id, table_number, amount
});

 const order = await new_order.save()

    resp.status(201).send({
      message: "order Add successfully",
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

export default AddOrder;
