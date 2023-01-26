import joi from "joi";

export const schemaItem = joi.object({
  nameItem: joi.string().min(3).max(15).required(),
  imageItem: joi.string().uri().required(),
  valueItem: joi.number().positive().required(),
  quantityItem: joi.number().integer().allow(0).positive().required(),
});

export const schemaItemId = joi.object({
  idItem: joi.string().required(),
});

export const schemaItemQuantity = joi.object({
  quantityItem: joi.number().integer().positive().required(),
});
