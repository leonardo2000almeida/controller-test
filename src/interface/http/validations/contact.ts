import Joi from "joi";

export const createContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  type: Joi.string()
    .regex(/(PF|PJ)/m)
    .required(),
  cpfCnpj: Joi.alternatives().conditional("type", {
    is: "PF",
    then: Joi.string().replace(/\.|\-/m, "").length(11).required(),
    otherwise: Joi.string()
      .replace(/\.|\-|\//m, "")
      .length(14)
      .required(),
  }),
  address: Joi.object({
    zipcode: Joi.string().replace("-", "").length(8).required(),
    street: Joi.string().required(),
    number: Joi.number().required(),
    complement: Joi.string().empty(),
    district: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
  }).required(),
});

export const updateContact = Joi.object({
  status: Joi.forbidden(),
});
