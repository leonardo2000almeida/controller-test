import { Request, Response } from "express";
import contactUseCases from "../../../application/useCases/contact";
import addressUsecases from "../../../application/useCases/address";
import redisUseCases from "../../../application/useCases/redis";

class ContactController {
  static create = async (req: Request, res: Response) => {
    try {
      const newContact = await contactUseCases.create(req.body);

      if (newContact) {
        await addressUsecases.create({
          ...req.body.address,
          contacts: newContact?.id,
        });

        res.status(201).json({
          message: "Contact save with success!",
          status: 201,
        });
      }
    } catch (err) {
      res.status(500).json({
        err,
      });
      console.log("Error on class ContactController method: create\n", err);
    }
  };

  static get = async (req: Request, res: Response) => {
    try {
    } catch (err) {
      res.status(500).json({
        err,
      });
      console.log("Error on class ContactController method: get\n", err);
    }
  };

  static update = async (req: Request, res: Response) => {
    try {
    } catch (err) {
      console.log("Error on class ContactController method: update\n", err);
    }
  };

  static delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await contactUseCases.readOne(id);

      if (!user)
        return res.status(404).json({
          message: "User not found with this id",
          status: 404,
        });

      if (user?.status === "inativo")
        return res.status(200).json({
          message: "User not disabled because already is",
          status: 200,
        });

      const userUpdate = await contactUseCases.delete(id);

      if (userUpdate?.affected)
        return res.status(201).json({
          message: "User disabled",
          status: 201,
        });
    } catch (err) {
      res.status(500).json({
        message: err,
        status: 500,
      });

      console.log("Error on class ContactController method: delete\n", err);
    }
  };

  static active = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await contactUseCases.readOne(id);

      if (!user)
        return res.status(404).json({
          message: "User not found with this id",
          status: 404,
        });

      if (user?.status === "ativo")
        return res.status(200).json({
          message: "User not active, because already is",
          status: 200,
        });

      user.status = "ativo";

      const userUpdate = await contactUseCases.update(user);

      if (userUpdate?.affected)
        return res.status(201).json({
          message: "User actived",
          status: 201,
        });
    } catch (err) {
      res.status(500).json({
        message: err,
        status: 500,
      });

      console.log("Error on class ContactController method: active\n", err);
    }
  };
}

export default ContactController;
