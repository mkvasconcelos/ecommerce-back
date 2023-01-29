import express from "express";
import {
  validItemId,
  validItemQuantity,
} from "../middleware/schemaMiddleware.js";
import { validItemExist } from "../middleware/itemMiddleware.js";
import {
  deleteCart,
  deleteItem,
  finishCart,
  getCart,
  postCart,
  putCart,
} from "../controllers/cartController.js";
import { tokenValidation } from "../middleware/tokenMiddleware.js";

const cartRouter = express.Router();
cartRouter.get("/cart", tokenValidation, getCart);
cartRouter.post(
  "/cart/:idItem",
  tokenValidation,
  validItemId,
  validItemQuantity,
  validItemExist,
  postCart
);
cartRouter.put(
  "/cart/:idItem",
  tokenValidation,
  validItemId,
  validItemQuantity,
  validItemExist,
  putCart
);
cartRouter.delete("/cart", tokenValidation, deleteCart);
cartRouter.delete("/cart/:idItem", tokenValidation, validItemId, deleteItem);
cartRouter.post("/cart-payment", tokenValidation, finishCart, deleteCart);

export default cartRouter;
