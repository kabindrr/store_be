import { ResponseClient } from "../middlewares/ResponseClient.js";
import { createNewSession } from "../models/sessions/SessionModal.js";
import { addUser, readUser } from "../models/usermodal/UserModal.js";
import { UserActivationURLEmail } from "../services/EmailServices.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import { Sign_Access_JWT } from "../utils/JWT.js";

//create new user
export const insertUser = async (req, res, next) => {
  try {
    //encrypt password with bcryptjs and save in data base
    req.body.password = hashPassword(req.body.password);
    console.log(req.body);

    const user = await addUser(req.body);
    //if the user is registered it should have _id so send the unique activation link to the  email using nodemailer
    if (user?._id) {
      const session = await createNewSession({
        token: uuidv4(),
        associaton: user.email,
      });

      if (session?._id) {
        const url = `${process.env.ROOT_URL}/activate-user?sessionId=${session._id}&t=${session.token}`;
        //if the url is created send this to the registration email
        const emailId = await UserActivationURLEmail({
          email: user.email,
          url,
          name: user.fName,
        });
        if (emailId) {
          const message =
            "We have sent you a link to activate your account. Please check your email and follow the instructions.";
          return ResponseClient({ req, res, message });
        }
      }
    }

    throw new Error("Unable to create new account, try again later");
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "This email already exist for another user, use different email and try again later";
      error.statusCode = 400;
    }
    next(error);
  }
};

//login user
export const getUser = async (req, res, next) => {
  try {
    //get user email
    const { email, password } = req.body;
    console.log(email, password);

    const user = await readUser(email);

    //verify the password
    if (user?._id) {
      const isPasswordCorrect = comparePassword(password, user.password);

      if (isPasswordCorrect) {
        const JWT_TOOKEN = Sign_Access_JWT({ email: email });
        user.password = undefined;

        //user authenticated
        if (email && password) {
          res.json({
            status: "success",
            message: "login success",
            user,
            JWT_TOOKEN,
          });
        }
        return;
      }
    }

    res.status(401).json({
      status: "error",
      error: "Invalid email and password",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};
