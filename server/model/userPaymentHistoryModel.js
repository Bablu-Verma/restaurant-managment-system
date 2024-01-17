

const userPaymentHistorySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    payment_history: [],
  }
);

const UserPaymentHistoryModel = mongoose.model("UserPaymentHistory", userPaymentHistorySchema);
export default UserPaymentHistoryModel;
