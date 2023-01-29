import Joi from "joi"

export const schemaSignIn = Joi.object({
email: Joi.string().required(),
name: Joi.string().required(),
phone: Joi.number().required(),
pwd: Joi.string().required(),
repeatPwd: Joi.string().valid(Joi.ref("pwd")).required()
})

export const schemaSignUp = Joi.object({
email: Joi.string().email().required(),
pwd: Joi.string().required()
})