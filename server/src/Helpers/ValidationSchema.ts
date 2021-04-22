import Joi from "joi";

export const regAuthSchema = Joi.object({
  username: Joi.string().min(5).required(),
  password: Joi.string().min(5).required(), 
  name: Joi.string().min(5).required()
})

export const loginAuthSchema = Joi.object({
  username: Joi.string().min(5).required(), 
  password: Joi.string().min(5).required()
})