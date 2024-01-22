import CategoryModel from "../../model/categoryModel.js";



const DeleteCategoryController = async (req, resp) => {

  const { category_id } = req.body;

  if (!category_id) {
    return resp.status(401).send({
      message: "Add Your Category id",
      code: 0,
      status: 0,
    });
  }
 

  try {

    const existingCategory = await CategoryModel.findById(category_id);

    if (!existingCategory) {
        return resp.status(200).send({
          message: "this Category not exists in your store.",
          code: 1,
          status: 1,
          category:  existingCategory
        });
      }

  const deletecategory = await CategoryModel.findByIdAndDelete(category_id);

    resp.status(200).send({
      message: "Category delete successfully",
      code: 1,
      status: 1,
      category:deletecategory,
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

export default DeleteCategoryController;
