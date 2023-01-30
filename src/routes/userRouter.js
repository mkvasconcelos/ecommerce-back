import express from "express";
import { tokenValidation } from "../middleware/tokenMiddleware.js";
import { getUser } from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.get("/users", tokenValidation, getUser);

export default userRouter;
