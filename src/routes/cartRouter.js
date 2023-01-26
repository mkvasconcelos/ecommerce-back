import express from "express";
import {
  validItemId,
  validItemQuantity,
} from "../middleware/schemaMiddleware.js";
import { validItemExist } from "../middleware/itemMiddleware.js";
import {
  deleteCart,
  finishCart,
  postCart,
  putCart,
} from "../controllers/cartController.js";

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
castRouter.put(
  "/cart/:idItem",
  //   validToken,
  //   validUser,
  validItemId,
  validItemQuantity,
  validItemExist,
  putCart
);
castRouter.delete("/cart", deleteCart);
castRouter.post("/cart-payment", finishCart, deleteCart);

export default castRouter;
