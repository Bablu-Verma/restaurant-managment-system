import FoodModel from "../../model/foodModel.js";



const AddFood = async (req, resp) => {
  const { name, store_id, description, price, category_id, food_offer,food_code, rating,rating_count} = req.body;

  let image_url = null
  if (req.file) {
    image_url = req.file.filename;
  }


  if (!name) {
    return resp.status(401).send({
      message: "Add food name",
      code: 0,
      status: 0,
    });
  }
  if (!description) {
    return resp.status(401).send({
      message: "Add food description",
      code: 0,
      status: 0,
    });
  }
  if (!price) {
    return resp.status(401).send({
      message: "Add food price",
      code: 0,
      status: 0,
    });
  }
  if (!category_id) {
    return resp.status(401).send({
      message: "Add food Category",
      code: 0,
      status: 0,
    });
  }
  if (!food_code) {
    return resp.status(401).send({
      message: "Add any unique food code for rember",
      code: 0,
      status: 0,
    });
  }


  try {
   
    const existingFood = await FoodModel.findOne({ store_id, food_code });

    if (existingFood) {
      return resp.status(200).send({
        message: "A Food with the same code already exists in this store.",
        code: 1,
        status: 1,
        existingFood
      });
    }


    if(image_url == null){
      const newFood = new FoodModel({
        name, store_id, description, price, category_id, food_offer ,food_code, rating,rating_count
    });

    const food = await newFood.save()

    resp.status(201).send({
      message: "Add Food successfully",
      code: 1,
      status: 1,
      food,
    });
    }else{
      const newFood = new FoodModel({
        name, store_id, description, price, category_id, food_offer ,food_code, rating,rating_count, image_url
    });

    const food = await newFood.save()

    resp.status(201).send({
      message: "Add Food successfully",
      code: 1,
      status: 1,
      food,
    });
    }
   
  } catch (error) {
    resp.status(500).send({
      message: "Server Error",
      code: 0,
      status: 0,
      error,
    });
  }
};

export default AddFood;
