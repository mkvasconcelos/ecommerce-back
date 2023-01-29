import { ObjectId } from "mongodb";
import db from "../database/database.js";

export async function postCart(req, res) {
  //   const { idItem, quantityItem, idUser } = res.locals;
  const { idItem, quantityItem } = res.locals;
  const { idUser } = req.body;
  const item = await db.collection("items").findOne({
    _id: ObjectId(idItem),
  });
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
          $push: {
            order: {
              idItem,
              nameItem: item.nameItem,
              imageItem: item.imageItem,
              valueItem: item.valueItem,
              quantityItem,
            },
          },
        }
      );
      return res.sendStatus(201);
    } catch (err) {
      return res.sendStatus(500);
    }
  }
}

export async function getCart(req, res) {
  const { idUser } = req.body;
  try {
    const cart = await db
      .collection("cart")
      .findOne({ userId: ObjectId(idUser) });
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function putCart(req, res) {
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
          $set: { "order.$.quantityItem": quantityItem },
        }
      );
      return res.sendStatus(201);
    } catch (err) {
      return res.sendStatus(500);
    }
  } else {
    return res.status(422).send("This item is not in your cart.");
  }
}

export async function deleteCart(req, res) {
  //   const { idUser } = res.locals;
  const { idUser } = req.body;
  const userCart = await db.collection("cart").findOne({
    userId: ObjectId(idUser),
  });
  if (userCart.order.length === 1) {
    return res.status(422).send("Your cart is already empty.");
  }
  try {
    await db.collection("cart").updateOne(
      { userId: ObjectId(idUser) },
      {
        $set: { order: [""] },
      }
    );
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function finishCart(req, _, next) {
  //   const { idUser } = res.locals;
  const { idUser } = req.body;
  const userCart = await db.collection("cart").findOne({
    userId: ObjectId(idUser),
  });
  let totalCart = 0;
  for (let i = 1; i < userCart.order.length; i++) {
    totalCart += userCart.order[i].valueItem * userCart.order[i].quantityItem;
    await db.collection("items").updateOne(
      { _id: ObjectId(userCart.order.idItem) },
      {
        $inc: { quantityItem: userCart.order.quantityItem },
      }
    );
  }
  await db.collection("users").updateOne(
    { _id: ObjectId(idUser) },
    {
      $push: { order: userCart.order },
    }
  );
  await db.collection("users").updateOne(
    { _id: ObjectId(idUser) },
    {
      $push: { order: userCart.order },
    }
  );
  await db.collection("admin").updateOne(
    { role: "admin" },
    {
      $inc: { income: totalCart },
    }
  );
  next();
}
