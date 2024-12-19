import mongoose from "mongoose";

const uri = process.env.MONGO_DB;

export const Mongo_Db_Connection = () => {
  try {
    console.log(uri);
    mongoose.connect(uri);
    console.log("Database connected with mongoose");
  } catch (error) {
    console.log(error.message);
  }
};
