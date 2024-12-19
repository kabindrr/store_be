import express from "express";
import { insertUser } from "../controllers/AuthController.js";

export const AuthRoute = express.Router();

//User registration
AuthRoute.post("/register", insertUser);
