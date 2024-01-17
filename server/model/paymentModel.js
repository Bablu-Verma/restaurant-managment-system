import mongoose from "mongoose";

 
 
  const paymentSchema = new mongoose.Schema(
    {
      user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      store_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
      },
      method: {
        type: String,
        required: [true, "Payment method is required"],
        enum: ["CREDIT_CARD", "DEBIT_CARD", "PAYPAL", "OTHER"],
      },
      amount: {
        type: Number,
        required: [true, "Payment amount is required"],
      },
      transaction_date: {
        type: Date,
        default: Date.now,
      },
      transaction_status: {
        type: String,
        required: [true, "Transaction status is required"],
        enum: ["PENDING", "COMPLETED", "FAILED"],
      },
    },
    { timestamps: true }
  );
  

  export default PaymentModel = mongoose.model("Payment", paymentSchema)