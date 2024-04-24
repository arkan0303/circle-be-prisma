import joi from "joi";
import { IRegister } from "../../type/app";

export const registerValidation = (data: IRegister) => {
  const schema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    fullname: joi.string().required(),
    profile: joi.string().allow(null).optional,
    sampul: joi.string().allow(null).optional,
    bio: joi.string().allow(null).optional,
  });
  return schema.validate(data);
};
