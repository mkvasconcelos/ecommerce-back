import Joi from "joi";

export const schemaSignUp = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  phone: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
  pwd: Joi.string().required(),
  repeatPwd: Joi.string().valid(Joi.ref("pwd")).required(),
});

export const schemaSignIn = Joi.object({
  email: Joi.string().email().required(),
  pwd: Joi.string().required(),
});
