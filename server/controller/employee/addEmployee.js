import { validateEmail } from "../../helper/smallFunction.js";
import StoreModel from "../../model/storeModel.js";
import UserModel from "../../model/userModel.js";

export const SearchToAddStoreEmployee = async (req, resp) => {
  const { email } = req.body;

  if (!email) {
    return resp.status(401).send({
      message: "Add to gmail Find user ",
      code: 0,
      status: 0,
    });
  }

  if (!validateEmail(email)) {
    return resp.status(401).send({
      message: "Enter Valid Email",
      code: 0,
      status: 0,
    });
  }

  try {
    const findUser = await UserModel.findOne({ email });

    if (!findUser) {
      return resp.status(200).send({
        message:
          "User not found, Please enter valid email address to user search",
        code: 1,
        status: 1,
      });
    }

    resp.status(200).send({
      message: "your user ",
      error: 0,
      status: 1,
      user: findUser,
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

export const AddStoreEmployee = async (req, resp) => {
  const { employee_id, employee_role, store_id } = req.body;

  if (!employee_id) {
    return resp.status(401).send({
      message: "Add Employee Id",
      code: 0,
      status: 0,
    });
  }
  if (!employee_role) {
    return resp.status(401).send({
      message: "Add Employee role",
      code: 0,
      status: 0,
    });
  }

  try {
    const store = await StoreModel.findById(store_id);

    const userIndex = store.work_role.findIndex((userRole) =>
      userRole.user.equals(employee_id)
    );

    if (userIndex === -1) {
      store.work_role.push({ user: employee_id, role: employee_role });
    } else {
      store.work_role[userIndex].role = employee_role;
    }

    const add_store_employe = await store.save();

    console.log(store);

    resp.status(200).send({
      message: "Add employee in your store",
      code: 1,
      status: 1,
      store: add_store_employe,
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

export const ListStoreEmployee = async (req, resp) => {
  const { store_id } = req.body;

  

  try {
    const store = await StoreModel.findById(store_id);

    const userIDs = store.work_role.map(employee => employee.user);

    const users = await UserModel.find({ _id: { $in: userIDs } });

    const storeEmployees = store.work_role.map(employee => {
      const userDetails = users.find(user => user._id.equals(employee.user));

      if (userDetails) {
        return {
          name: userDetails.name,
          email: userDetails.email,
          phone: userDetails.phone,
          work_role: employee.role,
        };
      } else {
       
        return {
          name: 'User not found',
          email: 'N/A',
          phone: 'N/A',
          work_role: 'N/A',
        };
      }
    });

    resp.status(200).send({
      message: "Store employee list",
      code: 1,
      status: 1,
      store_employees: storeEmployees,
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


export const RemoveStoreEmployee = async (req, resp) => {
  const { employee_id, store_id } = req.body;


  console.log(req.body)
  
  if (!employee_id) {
    return resp.status(401).send({
      message: "Add Employee Id",
      code: 0,
      status: 0,
    });
  }

  try {
    const store = await StoreModel.findById(store_id);

    store.work_role = store.work_role.filter(
      (userRole) => !userRole.user.equals(employee_id)
    );

    const updatedStore = await store.save();

    resp.status(200).send({
      message: "Store employee is removed successfully",
      code: 1,
      status: 1,
      store: updatedStore,
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
