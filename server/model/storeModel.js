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
    payment_receive_qr_image: {
      type: String,
      required: [true, " Store logo is require"],
    },
    subscription_type: {
      type: Number,
      required: [true, " subscription is require"],
      enum: [0, 1, 2, 3, 4], // 0 PENDING, 1 FREE, 2 SUBSCRIBE, 3 PAYMENTHOLD
      default: 1,
    },
    subscription_start_date: {
      type: Date,
    },
    subscription_end_date: {
      type: Date,
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

storeSchema.methods.updateSubscriptionStatus = function() {
  const currentDate = new Date();
  if (this.subscription_end_date && currentDate > this.subscription_end_date) {
    this.subscription_type = 0;
  }
};
