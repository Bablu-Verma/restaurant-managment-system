import mongoose from "mongoose";



const categorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: [true, "Category name is require"],
    },
    store_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: [true, " Store id is require"],
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", categorySchema);
export default CategoryModel;


