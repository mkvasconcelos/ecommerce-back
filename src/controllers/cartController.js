import { ObjectId } from "mongodb";
import db from "../database/database.js";

export async function postCart(req, res) {
  //   const { idItem, quantityItem, idUser } = res.locals;
  const { idItem, quantityItem } = res.locals;
  const { idUser } = req.body;
  const idItemCheck = await db.collection("cart").findOne({
    "order.idItem": { $in: [idItem] },
  });
  if (idItemCheck) {
    try {
      await db.collection("cart").updateOne(
        { userId: ObjectId(idUser), "order.idItem": idItem },
        {
          $inc: { "order.$.quantityItem": quantityItem },
        }
      );
      return res.sendStatus(201);
    } catch (err) {
      return res.sendStatus(500);
    }
  } else {
    try {
      await db.collection("cart").updateOne(
        { userId: ObjectId(idUser) },
        {
          $push: { order: { idItem, quantityItem } },
        }
      );
      return res.sendStatus(201);
    } catch (err) {
      return res.sendStatus(500);
    }
  }
}
