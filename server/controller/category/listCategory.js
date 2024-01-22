import CategoryModel from "../../model/categoryModel.js";

const ListCategoryController = async (req, resp) => {
  const { store_id } = req.body;

  try {
   

    const category = await CategoryModel.find({store_id})

    resp.status(200).send({
      message: "Category list successfully",
      code: 1,
      status: 1,
      length:category.length,
      category,
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

export default ListCategoryController;
