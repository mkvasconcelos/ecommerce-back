import express from "express";
import {
  validItemId,
  validItemQuantity,
} from "../middleware/schemaMiddleware.js";
import { validItemExist } from "../middleware/itemMiddleware.js";
import {
  deleteCart,
  finishCart,
  getCart,
  postCart,
  putCart,
} from "../controllers/cartController.js";

const cartRouter = express.Router();
cartRouter.get(
  "/cart",
  // validToken,
  // validUser
  getCart
);
cartRouter.post(
  "/cart/:idItem",
  //   validToken,
  //   validUser,
  validItemId,
  validItemQuantity,
  validItemExist,
  postCart
);
cartRouter.put(
  "/cart/:idItem",
  //   validToken,
  //   validUser,
  validItemId,
  validItemQuantity,
  validItemExist,
  putCart
);
cartRouter.delete("/cart", deleteCart);
cartRouter.post("/cart-payment", finishCart, deleteCart);

export default cartRouter;
