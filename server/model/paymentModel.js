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
        enum: ['RAZORPAY'],
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
        type: Number,
        required: [true, "Transaction status is required"],
        enum: [0,1,2],  //  0 FAILED, 1 COMPLETED, 2 PENDING
      },
    },
    { timestamps: true }
  );
  

  export default PaymentModel = mongoose.model("Payment", paymentSchema)