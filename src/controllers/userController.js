import db from "../database/database.js";
import { ObjectId } from "mongodb";

export async function getUser(_, res) {
  const { idUser } = res.locals;
  try {
    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(idUser) });
    return res.status(200).send(user);
  } catch (err) {
    return res.sendStatus(500);
  }
}
