import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";


export const validateEmail = (email) => {
  let checkEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return checkEmail.test(email);
};

export const hashPassword = async (password) => {
  const salt = process.env.SALT;
  const hashedPassword = await bcrypt.hash(password, parseInt(salt));
  return hashedPassword;
};

export const strongPassword = (password) => {
  let check_password =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  return check_password.test(password);
};

export const compare_password = async (client_password, server_password) => {
  const password = await bcrypt.compare(client_password, server_password);
  return password;
};


 export const generateToken = async (user)=>{
    let SECRETKEY = process.env.SECRETKEY;
    const d = new Date();
    let time = d.getTime();

    let payload = {
        id:user._id,
        email:user.email,
        time:time   
    }
    const token = await Jwt.sign(payload, SECRETKEY, {
      expiresIn: "7d",
    });

    return token
}

export const decoded_token = async (authorization) =>{
      const decoded = await Jwt.verify(authorization, process.env.SECRETKEY);
      return decoded
}
 
 export function isValidPhoneNumber(phoneNumber) {
  const regex = /^\d{10}$/;
  return regex.test(phoneNumber);
}

export const checkValidTime = (time)=>{

  const token_time = time;
  const add10min = token_time + 10 * 60 * 1000;
  const gat_date = new Date();
  const current_time = gat_date.getTime();

  if (add10min <= current_time) {
    return false
  }else{
    return true
  }

} 