import mongoose from "mongoose";


const tableSchema = new mongoose.Schema(
  {
    table_no: {
      type: Number,
      required: [true, "Table Number is require"],
      index: true,
    },
    store_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: [true, "store id is require"],
        index: true,
    },
    qr_url:{
        type: String,
        required: [true, "qr image is require"],
    }
  },
  { timestamps: true }
);

const TableModel = mongoose.model("Table", tableSchema);
export default TableModel;

