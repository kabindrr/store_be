import bcryptjs from "bcryptjs";
import e from "express";

const saltRound = 5;

export const hashPassword = (plainPass) => {
  return bcryptjs.hashSync(plainPass, saltRound);
};

export const comparePassword = (plainPass, hashPassword) => {
  return bcryptjs.compareSync(plainPass, hashPassword);
};
