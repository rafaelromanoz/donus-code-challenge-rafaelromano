import Joi from "joi";

const regexCPF = /\d{3}\.\d{3}\.\d{3}-\d{2}/;

const userSchema = Joi.object({
  cpf: Joi.string().regex(regexCPF).required().messages({
    'string.pattern.base': 'CPF inválido'
  }),
  name: Joi.string().min(10).required(),
});

export default userSchema;
