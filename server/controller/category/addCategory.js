import CategoryModel from "../../model/categoryModel.js";



const AddCategoryController = async (req, resp) => {
  const { category_name, store_id } = req.body;

  if (!category_name) {
    return resp.status(401).send({
      message: "Add Your Category Name",
      code: 0,
      status: 0,
    });
  }
 

  try {

    const existingCategory = await CategoryModel.findOne({ category_name, store_id });

    if (existingCategory) {
        return resp.status(200).send({
          message: "this Category is already exists in store.",
          code: 1,
          status: 1,
          category:  existingCategory
        });
      }

    const newCategory = new CategoryModel({
      store_id,
      category_name,
    });

    const category = await newCategory.save();

    resp.status(201).send({
      message: "Category created successfully",
      code: 1,
      status: 1,
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

export default AddCategoryController;
