import db from "../database/database.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

export async function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
  const secretKey = process.env.JWT_SECRET;
  const token = authorization?.replace("Bearer ", "");
  try {
    const data = jwt.verify(token, secretKey);
    const getToken = await db
      .collection("sessions")
      .findOne({ _id: ObjectId(data.session) });
    if (!getToken)
      return res.status(401).send("Your session expired, sign-in again.");
    res.locals.idUser = getToken.userId;
    next();
  } catch {
    return res.status(401).send("Your session expired, sign-in again.");
  }
}
