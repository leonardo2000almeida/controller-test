import { Request, Response } from "express";
import redisUseCases from "../../../application/useCases/redis";

class CsvController {
  static export = async (req: Request, res: Response) => {
    try {
      const contacts = await redisUseCases.get();
      console.log(contacts);
      res.status(201).json({
        message: contacts,
        status: 200,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
        status: 500,
      });
    }
  };

  static import = async (req: Request, res: Response) => {
    try {
      const csv = req.body;
      const redisSet = await redisUseCases.create(csv);

      res.status(201).json({
        message: "CSV imported with success!",
        status: 201,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
        status: 500,
      });
    }
  };
}

export default CsvController;
