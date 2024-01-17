import mongoose from "mongoose";
import { addressSchema } from "./addressSchema.js";

const storeSchema = new mongoose.Schema(
  {
    store_name: {
      type: String,
      required: [true, "Store name is require"],
      index: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, " Owner (user id) is require"],
      index: true,
    },
    address: {
      type: addressSchema,
      required: [true, "address is require"],
    },
    store_logo: {
      type: String,
      required: [true, " Store logo is require"],
    },
    subscription_type: {
      type: String,
      required: [true, " subscription is require"],
      enum: ["30DAYSFREE", "PENDING", "SUBSCRIBER"],
      default: "30DAYSFREE",
    },
    subscription_start_date: {
      type: Date,
    },
    subscription_end_date: {
      type: Date,
    },
    payment_details: {
      payment_method: {
        type: String, // e.g., 'credit_card', 'paypal'
      },
      transaction_id: {
        type: String, // Unique ID for the transaction
      },
      payment_amount: {
        type: Number,
        required: [true, "Payment amount is required"],
      },
      payment_date: {
        type: Date,
      },
      payment_status: {
        type: String, // e.g., 'completed', 'pending', 'failed'
      },
    },
    audit_trail: [{
        changed_at: Date,
        changes: mongoose.Schema.Types.Mixed, 
      }],
  },
  { timestamps: true }
);

const StoreModel = mongoose.model("Store", storeSchema);
export default StoreModel;


