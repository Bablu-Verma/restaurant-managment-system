import mongoose from "mongoose";

 export const addressSchema = new mongoose.Schema({
    street: {
      type: String,
      required: [true, "Street is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    pin_code: {
      type: String,
      required: [true, "Pin code is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      default:'India'
    }
  });
  