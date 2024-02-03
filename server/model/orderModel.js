import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  food_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food", // assuming you have a Food model
    required: [true, "Food ID is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  total_price: {
    type: Number,
    required: [true, "Total price is required"],
  },
});


const orderPaymentSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ["CASH", "UPI"], 
    required: [true, "Payment method is required"],
  },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
  amount: {
    type: Number,
    required: [true, "Payment amount is required"],
  },
});




const orderSchema = new mongoose.Schema(
  {
    foods: [orderItemSchema],
    store_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: [true, "Store ID is required"],
    },
    table_number: {
      type: String,
      required: [true, "Table number is required"],
    },
    amount: {
      type: Number,
      required: [true, "Total amount is required"],
    },
    status: {
      type: String,
      enum: ["Preparing", "Prepared", "On Table"],
      default: "Preparing",
    },
    order_id:{
      type: Number,
      default: 1,
    },
    payment:orderPaymentSchema
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;








