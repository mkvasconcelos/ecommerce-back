import { ObjectId } from "mongodb";
import db from "../database/database.js";

export async function validItemDuplicate(_, res, next) {
  const { nameItem } = res.locals;
  try {
    const itemDuplicate = await db.collection("items").findOne({
      nameItem,
    });
    if (itemDuplicate) {
      return res.status(422).send("Item already exists.");
    }
  } catch (err) {
    return res.sendStatus(500);
  }
  next();
}

export async function validItemExist(_, res, next) {
  const { idItem } = res.locals;
  try {
    const itemExist = await db.collection("items").findOne({
      _id: ObjectId(idItem),
    });
    if (!itemExist) {
      return res.status(422).send("Item does not exist.");
    }
  } catch (err) {
    return res.sendStatus(500);
  }
  next();
}
