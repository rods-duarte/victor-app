import Joi from "joi";

export const registerSchema = Joi.object({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
    confirmarSenha: Joi.string().valid(Joi.ref('senha')).required(),
    rg: Joi.string().required(),
    nacionalidade: Joi.string().required(),
    estado: Joi.string().required(),
    dataNascimento: Joi.date().required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required()
});