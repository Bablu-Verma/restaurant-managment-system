import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: [true, "Food name is require"],
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
  },
  { timestamps: true }
);

const FoodModel = mongoose.model("Food", foodSchema);
export default FoodModel;
