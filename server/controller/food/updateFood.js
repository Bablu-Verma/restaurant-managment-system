import FoodModel from "../../model/foodModel.js";

const UpdateFood = async (req, resp) => {
  const {
    name,
    store_id,
    description,
    price,
    category_id,
    food_offer,
    food_code,
    rating,
    rating_count,
    food_id,
  } = req.body;

  let image_url = null;
  if (req.file) {
    image_url = req.file.filename;
  }

  if (!food_id) {
    return resp.status(401).send({
      message: "food id is required",
      code: 0,
      status: 0,
    });
  }

  try {
    const existingFood = await FoodModel.findById(food_id);

    if (!existingFood) {
      return resp.status(401).send({
        message: "food not found in database",
        code: 0,
        status: 0,
      });
    }
    if (name) {
      existingFood.name = name;
    }

    if (description) {
      existingFood.description = description;
    }
    if (price) {
      existingFood.price = price;
    }
    if (category_id) {
      existingFood.category_id = category_id;
    }

    const Foodcode = await FoodModel.findOne({ store_id, food_code });
    if (Foodcode) {
      return resp.status(401).send({
        message: "Add any unique food code for rember",
        code: 0,
        status: 0,
      });
    }

    if (food_code) {
      existingFood.food_code = food_code;
    }

    if (image_url) {
      existingFood.image_url = image_url;
    }

    const updatefood = await existingFood.save();

    resp.status(201).send({
      message: " Food update successfully",
      code: 1,
      status: 1,
      updatefood,
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

export default UpdateFood;
