import { ObjectId } from "mongodb";
import db from "../database/database.js";
import twilio from "twilio";

export async function postCart(_, res) {
  const { idItem, quantityItem, idUser } = res.locals;
  const item = await db.collection("items").findOne({
    _id: ObjectId(idItem),
  });
  const idItemCheck = await db.collection("cart").findOne({
    "order.idItem": { $in: [idItem] },
  });
  if (idItemCheck) {
    let quantityItemExistent = 0;
    for (let i = 0; i < idItemCheck.order.length; i++) {
      if (idItemCheck.order[i].idItem === idItem) {
        quantityItemExistent = idItemCheck.order[i].quantityItem;
      }
    }
    try {
      await db.collection("cart").updateOne(
        { userId: ObjectId(idUser), "order.idItem": idItem },
        {
          $inc: {
            totalOrder: quantityItem * item.valueItem,
            "order.$.quantityItem": quantityItem,
          },
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
          $inc: { totalOrder: quantityItem * item.valueItem },
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

export async function getCart(_, res) {
  const { idUser } = res.locals;
  try {
    const cart = await db
      .collection("cart")
      .findOne({ userId: ObjectId(idUser) });
    return res.status(200).send(cart);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function putCart(_, res) {
  const { idItem, quantityItem, idUser } = res.locals;
  const idItemCheck = await db.collection("cart").findOne({
    "order.idItem": { $in: [idItem] },
  });
  if (idItemCheck) {
    let quantityItemExistent = 0;
    let valueItemExistent = 0;
    for (let i = 0; i < idItemCheck.order.length; i++) {
      if (idItemCheck.order[i].idItem === idItem) {
        quantityItemExistent = idItemCheck.order[i].quantityItem;
        valueItemExistent = idItemCheck.order[i].valueItem;
      }
    }
    try {
      await db.collection("cart").updateOne(
        { userId: ObjectId(idUser), "order.idItem": idItem },
        {
          $inc: {
            totalOrder:
              (quantityItem - quantityItemExistent) * valueItemExistent,
          },
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

export async function deleteCart(_, res) {
  const { idUser } = res.locals;
  const userCart = await db.collection("cart").findOne({
    userId: ObjectId(idUser),
  });
  if (userCart.order.length === 0) {
    return res.status(422).send("Your cart is already empty.");
  }
  try {
    await db.collection("cart").updateOne(
      { userId: ObjectId(idUser) },
      {
        $set: { order: [], totalOrder: 0 },
      }
    );
    const cart = await db
      .collection("cart")
      .findOne({ userId: ObjectId(idUser) });
    return res.status(200).send(cart);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function deleteItem(_, res) {
  const { idItem, idUser } = res.locals;
  const userCart = await db.collection("cart").findOne({
    userId: ObjectId(idUser),
  });
  if (userCart.order.length === 0) {
    return res.status(422).send("Your cart is already empty.");
  }
  let idItemCheck;
  for (let i = 0; i < userCart.order.length; i++) {
    if (userCart.order[i].idItem === idItem) {
      idItemCheck = userCart.order[i];
    }
  }
  if (idItemCheck) {
    try {
      await db.collection("cart").updateOne(
        { userId: ObjectId(idUser), "order.idItem": idItem },
        {
          $inc: {
            totalOrder: -idItemCheck.quantityItem * idItemCheck.valueItem,
          },
          $pull: { order: { idItem } },
        }
      );
      const cart = await db
        .collection("cart")
        .findOne({ userId: ObjectId(idUser) });
      return res.status(200).send(cart);
    } catch (err) {
      return res.sendStatus(500);
    }
  } else {
    return res.status(422).send("This item is not in your cart.");
  }
}

export async function finishCart(_, res, next) {
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  const client = twilio(accountSid, authToken);
  const { idUser } = res.locals;
  const user = await db.collection("users").findOne({
    _id: ObjectId(idUser),
  });
  const userCart = await db.collection("cart").findOne({
    userId: ObjectId(idUser),
  });
  if (userCart.order.length === 0) {
    return res.status(400).send("Your cart is empty!");
  }
  for (let i = 0; i < userCart.order.length; i++) {
    let item = await db
      .collection("items")
      .findOne({ _id: ObjectId(userCart.order[i].idItem) });
    if (userCart.order[i].quantityItem > item.quantityItem) {
      return res.status(400).send(`${item.nameItem} is out of stock.`);
    }
  }
  for (let i = 0; i < userCart.order.length; i++) {
    await db.collection("items").updateOne(
      { _id: ObjectId(userCart.order[i].idItem) },
      {
        $inc: { quantityItem: -userCart.order[i].quantityItem },
      }
    );
  }
  await db.collection("users").updateOne(
    { _id: ObjectId(idUser) },
    {
      $push: {
        order: { date: new Date(), orders: userCart.order },
      },
    }
  );
  await db.collection("admin").updateOne(
    { role: "admin" },
    {
      $inc: { income: userCart.totalOrder },
    }
  );
  let text = `Oi ${user.name}, obrigado por comprar conosco! O seu pedido foi:\n`;
  for (let i = 0; i < userCart.order.length; i++) {
    text += `\n${userCart.order[i].quantityItem} x ${userCart.order[i].nameItem}`;
  }
  text += `\n\nO total da sua compra foi de R$ ${userCart.totalOrder}. Para maiores informa????es entre em contato com mateuskvasconcelos@gmail.com`;
  client.messages
    .create({
      body: text,
      from: "whatsapp:+14155238886",
      to: `whatsapp:+55${user.phone}`,
    })
    .then()
    .done();
  next();
}
