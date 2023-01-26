import db from "../database/database.js";
import { ObjectId } from "mongodb";

export async function postItem(_, res) {
  const { nameItem, imageItem, valueItem, quantityItem } = res.locals;
  try {
    await db.collection("items").insertOne({
      nameItem,
      imageItem,
      valueItem,
      quantityItem,
    });
    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function getItem(_, res) {
  try {
    const items = await db.collection("items").find({}).toArray();
    return res.status(200).send(items);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function updateItem(_, res) {
  const { idItem, nameItem, valueItem, quantityItem } = res.locals;
  try {
    await db.collection("items").updateOne(
      { _id: ObjectId(idItem) },
      {
        $inc: { quantityItem },
        $set: {
          nameItem,
          valueItem,
        },
      }
    );
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
}
