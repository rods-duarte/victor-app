import Joi from "joi";

export const certificateSchema = Joi.object({
    nomeCurso: Joi.string().required(),
    dataInicio: Joi.date().required(),
    dataFim: Joi.date().required(),
    cargaHoraria: Joi.number().required(),
    descricao: Joi.string().required(),
});