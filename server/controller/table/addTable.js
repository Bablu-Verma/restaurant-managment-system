import QRCode from "qrcode";
import TableModel from "../../model/tableModel.js";

const AddTable = async (req, resp) => {
  const { table_no, store_id } = req.body;

  if (!store_id) {
    return resp.status(401).send({
      message: "Add Store Id",
      code: 0,
      status: 0,
    });
  }

  if (!table_no) {
    return resp.status(401).send({
      message: "Add Table Number",
      code: 0,
      status: 0,
    });
  }

  try {
    const url = `http://localhost:8800/order/?store=${store_id}&table=${table_no}`;

    const QR_URL = await QRCode.toDataURL(url);

    const existingTable = await TableModel.findOne({ table_no, store_id });

    if (existingTable) {
      return resp.status(200).send({
        message: "A table with the same number already exists in this store.",
        code: 1,
        status: 1,
        existingTable
      });
    }

    const newTable = new TableModel({
      store_id,
      table_no,
      qr_url: QR_URL,
    });

    const table = await newTable.save()

    resp.status(201).send({
      message: "table created successfully",
      code: 1,
      status: 1,
      table,
    });
  } catch (error) {
    resp.status(500).send({
      message: "Server Error",
      code: 0,
      status: 0,
      error,
    });
  }
};

export default AddTable;
