import UserSchema from "./UserSchema.js";

export const addUser = (obj) => {
  return UserSchema(obj).save();
};

export const readUser = (email) => {
  return UserSchema.findOne({ email });
};
