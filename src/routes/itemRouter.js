import express from "express";
import {
  getItem,
  postItem,
  updateItem,
} from "../controllers/itemController.js";
import {
  validItemDuplicate,
  validItemExist,
} from "../middleware/itemMiddleware.js";
import { validItem, validItemId } from "../middleware/schemaMiddleware.js";

const itemRouter = express.Router();
itemRouter.post("/items", validItem, validItemDuplicate, postItem);
itemRouter.get("/items", getItem);
itemRouter.put(
  "/items/:idItem",
  validItem,
  validItemId,
  validItemExist,
  updateItem
);

export default itemRouter;
