import { Router } from "express";
import { validSignUp, validSignIn } from "../middleware/schemaMiddleware.js";
import {
  signInAdmin,
  signInFunction,
  signUpFunction,
} from "../controllers/signController.js";

const signRouter = Router();
signRouter.post("/sign-in", validSignIn, signInFunction);
signRouter.post("/sign-up", validSignUp, signUpFunction);
signRouter.post("/sign-in-admin", validSignIn, signInAdmin);

export default signRouter;
