import {
  schemaItem,
  schemaItemId,
  schemaItemQuantity,
} from "../schemas/itemSchema.js";
import { schemaSignIn, schemaSignUp } from "../schemas/signSchema.js";

export async function validItem(req, res, next) {
  const { nameItem, imageItem, valueItem, quantityItem } = req.body;
  const newValueItem = Number(valueItem);
  const newQuantityItem = Number(quantityItem);
  const { error } = schemaItem.validate({
    nameItem,
    imageItem,
    valueItem: newValueItem,
    quantityItem: newQuantityItem,
  });
  if (error) {
    return res.status(422).send(error.details[0].message);
  }
  res.locals.nameItem = nameItem;
  res.locals.imageItem = imageItem;
  res.locals.valueItem = newValueItem;
  res.locals.quantityItem = newQuantityItem;
  next();
}

export async function validItemId(req, res, next) {
  const { idItem } = req.params;
  const { error } = schemaItemId.validate({
    idItem,
  });
  if (error) {
    return res.status(422).send(error.details[0].message);
  }
  res.locals.idItem = idItem;
  next();
}

export async function validItemQuantity(req, res, next) {
  const { quantityItem } = req.body;
  const newQuantityItem = Number(quantityItem);
  const { error } = schemaItemQuantity.validate({
    quantityItem: newQuantityItem,
  });
  if (error) {
    return res.status(422).send(error.details[0].message);
  }
  res.locals.quantityItem = newQuantityItem;
  next();
}

export async function validSignUp(req, res, next) {
  const { error } = schemaSignUp.validate(req.body, { abortEarly: false });
  if (error) {
    const errMessage = error.details.map((err) => err.message);
    return res.status(422).send(errMessage);
  }
  next();
}

export async function validSignIn(req, res, next) {
  const { error } = schemaSignIn.validate(req.body, { abortEarly: false });
  if (error) {
    const errMessage = error.details.map((err) => err.message);
    return res.status(422).send(errMessage);
  }
  next();
}
