import Joi from 'joi'
import UserType from '../types/user.type'

export const createUserValidation = (payload: UserType) => {
  const schema: Joi.ObjectSchema<UserType> = Joi.object({
    user_id: Joi.string().required(),
    email: Joi.string().required(),
    name: Joi.string().allow('', null),
    password: Joi.string().allow('', null),
    role: Joi.string().allow('', null)
  })
  return schema.validate(payload)
}

export const createSessionValidation = (payload: UserType) => {
  const schema: Joi.ObjectSchema<UserType> = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
  return schema.validate(payload)
}

export const refreshSessionValidation = (payload: UserType) => {
  const schema: Joi.ObjectSchema<UserType> = Joi.object({
    refreshToken: Joi.string().required()
  })
  return schema.validate(payload)
}
