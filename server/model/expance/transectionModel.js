import mongoose from "mongoose";


const transectionSchema = new mongoose.Schema(
  {
    store_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: [true, "store id is require"],
        index: true,
    },
    amount:{
      type: String,
      required: [true, "amount is required"],
    },
    category:{
        type: String,
        required: [true, "category is required"],
    },
    reference:{
      type: String,
        required: [true, "referance is required"],
    },
    description:{
      type: String,
    },
  },
  { timestamps: true }
);

const TransectionModel = mongoose.model("Transection", transectionSchema);
export default TransectionModel;

