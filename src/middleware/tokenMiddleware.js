import db from "../database/database.js";

export async function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const getToken = await db.collection("sessions").findOne({ token });
  if (!getToken)
    return res.status(401).send("Your session expired, sign-in again.");
  res.locals.idUser = getToken.userId;
  next();
}
