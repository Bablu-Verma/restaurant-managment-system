import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Food name is require"],
    },
    description: {
      type:String,
      required: [true, "Food Description is require"],
    },
    price: {
      type:Number,
      required: [true, "Food Price is require"],
    },
    image_url: {
      type:String,
      default: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category id is require"],
    },
    store_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: [true, " Store id is require"],
    },
    food_offer:{
      type:String
    },
    food_code:{
     type:Number
    },
    rating:{
      type:Number,
      default:5,
      min:1,
      max:5
    }
  },
  { timestamps: true }
);

const FoodModel = mongoose.model("Food", foodSchema);
export default FoodModel;
