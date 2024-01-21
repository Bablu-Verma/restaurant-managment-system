import TableModel from "../../model/tableModel.js";

 const deleteTableController = async (req, resp) => {
      const {table_id} = req.body
  
    if (!table_id) {
      return resp.status(401).send({
        message: "Pleae add table id",
        code: 0,
        status: 0,
      });
    }
  
    try {

        const find_table = await TableModel.findById(table_id)

        if (!find_table) {
            return resp.status(401).send({
              message: "Table already deleted",
              code: 0,
              status: 0,
            });
          }

      const deletetable = await TableModel.deleteOne({ _id: table_id  });

      return resp.status(200).send({
        message: "your Account deleted successfully",
        code: 1,
        status: 1,
        delete: deletetable
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


  export default deleteTableController