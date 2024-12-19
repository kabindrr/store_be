import { addUser } from "../models/UserModal.js";
import { hashPassword } from "../utils/bcrypt.js";

export const insertUser = async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);
    console.log(req.body);

    const user = await addUser(req.body);
    if (user?._id) {
      res.json({
        status: "success",
        message: "New Registration successful",
        user,
      });
    }
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "This email already exist for another user, use different email and try again later";
      error.statusCode = 400;
    }
    next(error);
  }
};
