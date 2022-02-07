import { Request, Response } from "express";
import contactUseCases from "../../../application/useCases/contact";
import addressUsecases from "../../../application/useCases/address";
import RedisUseCases from "../../../application/useCases/redis";

class ContactController {
  static create = async (req: Request, res: Response) => {
    try {
      const newContact = await contactUseCases.create(req.body);

      if (newContact) {
        const address = await addressUsecases.create({
          ...req.body.address,
          contact: newContact?.id,
        });

        Object.assign(address, newContact);

        await RedisUseCases.insertContact(address);

        res.status(201).json({
          message: "Contact save with success!",
          status: 201,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        message: err?.detail,
        status: 500,
      });
      console.log("Error on class ContactController method: create\n", err);
    }
  };

  static get = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const tryRedis = await RedisUseCases.get(id);
      if (tryRedis) {
        return res.status(200).json({
          contact: JSON.parse(tryRedis),
          status: 200,
        });
      } else {
        const [contact] = await contactUseCases.readOne(id);
        await RedisUseCases.insertContact(contact);

        if (contact) return res.status(200).json({ contact, status: 200 });
        else return res.status(404).json({ contact: "not found", status: 404 });
      }
    } catch (err: any) {
      res.status(500).json({
        message: err?.detail,
        status: 500,
      });
      console.log("Error on class ContactController method: get\n", err);
    }
  };

  static update = async (req: Request, res: Response) => {
    try {
      const userExist = await contactUseCases.readOne(req?.params?.id);

      if (userExist) {
        const userUpdate = await contactUseCases.update(req?.body);

        if (userUpdate.affected)
          return res
            .status(201)
            .json({ message: "User updated with success!", status: 201 });
      } else {
        return res
          .status(404)
          .json({ message: "User not found!", status: 404 });
      }
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
    } catch (err: any) {
      res.status(500).json({
        message: err?.detail,
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
    } catch (err: any) {
      res.status(500).json({
        message: err?.detail,
        status: 500,
      });

      console.log("Error on class ContactController method: active\n", err);
    }
  };
}

export default ContactController;
