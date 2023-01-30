import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import db from "../database/database.js";
import dayjs from "dayjs";

export async function signInFunction(req, res) {
  const { email, pwd } = req.body;
  try {
    const findUser = await db.collection("users").findOne({ email });
    if (!findUser) return res.status(400).send("Email or password wrong.");
    const comparePwd = bcrypt.compareSync(pwd, findUser.pwd);
    if (!comparePwd) return res.status(400).send("Email or password wrong.");
    const token = uuidV4();
    await db.collection("sessions").insertOne({
      userId: findUser._id,
      token: token,
      createdAt: Date.now(),
    });
    res.status(200).send({ token, email, name: findUser.name });
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function signUpFunction(req, res) {
  const { email, name, phone, pwd } = req.body;
  const hashedPwd = bcrypt.hashSync(pwd, 10);
  const emailAvailable = await db.collection("users").findOne({ email });
  if (emailAvailable) return res.status(400).send("Email already in use");
  try {
    await db.collection("users").insertOne({
      email,
      name,
      phone,
      pwd: hashedPwd,
      order: [],
    });
    const user = await db.collection("users").findOne({
      email,
    });
    await db.collection("cart").insertOne({
      userId: user._id,
      totalOrder: 0,
      order: [],
    });
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function signInAdmin(req, res) {
  const { email, pwd } = req.body;
  try {
    const findAdmin = await db.collection("admin").findOne({ email });
    if (!findAdmin) return res.status(400).send("Email or password wrong.");
    const comparePwd = pwd === findAdmin.pwd;
    if (!comparePwd) return res.status(400).send("Email or password wrong.");
    return res.status(200).send(findAdmin);
  } catch (err) {
    return res.status(500).send(err);
  }
}
