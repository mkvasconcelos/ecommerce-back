import express from "express";
import {
  validItemId,
  validItemQuantity,
} from "../middleware/schemaMiddleware.js";
import { validItemExist } from "../middleware/itemMiddleware.js";
import { postCart } from "../controllers/cartController.js";

const castRouter = express.Router();
castRouter.post(
  "/cart/:idItem",
  //   validToken,
  //   validUser,
  validItemId,
  validItemQuantity,
  validItemExist,
  postCart
);
// castRouter.delete("/cart", );

export default castRouter;
