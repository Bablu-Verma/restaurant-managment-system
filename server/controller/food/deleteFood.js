import FoodModel from "../../model/foodModel.js";

const DeleteFood = async (req, resp) => {

  const  {food_id} = req.body

  if (!food_id) {
    return resp.status(401).send({
      message: "Add food id is required",
      code: 0,
      status: 0,
    });
  }

  try {
   
    const deleteFood = await FoodModel.findByIdAndRemove(food_id);

    resp.status(200).send({
      message: "Food delete successfully",
      code: 1,
      status: 1,
      deleteFood
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

export default DeleteFood 