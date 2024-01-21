
import TableModel from "../../model/tableModel.js";

export const TableListController = async (req, resp) => {
  const { store_id } = req.body;

  if (!store_id) {
    return resp.status(401).send({
      message: "Add Store Id",
      code: 0,
      status: 0,
    });
  }

  try {
    const table = await TableModel.find({ store_id });

    if (table.length == 0) {
      return resp.status(200).send({
        message: "No Table Found, create a new table",
        code: 1,
        status: 1,
      });
    }

    resp.status(200).send({
      message: "store List successfully",
      code: 1,
      status: 1,
      total_table: table.length,
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



export const TableDetailController = async (req, resp) => {
  const { table_id } = req.body;

  if (!table_id) {
    return resp.status(401).send({
      message: "Add Table Id",
      code: 0,
      status: 0,
    });
  }

  try {
    const table = await TableModel.findById(table_id);

    if (!table) {
      return resp.status(200).send({
        message: "No Table Found",
        code: 1,
        status: 1,
      });
    }

    resp.status(200).send({
      message: "table detail get successfully",
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



