import Joi from 'joi';

export const userSchema = Joi.object({
  id: Joi.number().integer(),
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(255).required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
