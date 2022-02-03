import { NextFunction, Request, Response } from "express";
import Joi, { AnySchema } from "joi";
import { validateCNPJ, validateCPF } from "validations-br";

export const validator = (
  schema: AnySchema,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validation = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
    allowUnknown: true,
  });

  if (validation.error) {
    console.error(
      {
        middleware: "validator",
        details: validation.error.details,
      },
      "invalid request params"
    );
    res.send({ error: validation.error.details });
  } else {
    Object.assign(req.body, validation.value);
    return next();
  }
};
