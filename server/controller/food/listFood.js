import FoodModel from "../../model/foodModel.js";

const ListFood = async (req, resp) => {

  const  {store_id} = req.body

  try {
   
    const Food = await FoodModel.find({ store_id });

    resp.status(200).send({
      message: "Food get successfully",
      code: 1,
      status: 1,
      length:Food.length,
      Food
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

export default ListFood 