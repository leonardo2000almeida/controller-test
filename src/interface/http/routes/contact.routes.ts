import { Router } from "express";
import ContactController from "../controller/contact";
import { validator } from "../middleware/validator";
import { createContact, updateContact } from "../validations/contact";

const contactRouter = Router();

contactRouter.get("/:id", ContactController.get);

contactRouter.post(
  "/",
  (req, res, next) => validator(createContact, req, res, next),
  ContactController.create
);
contactRouter.post("/export", ContactController.export);

contactRouter.put(
  "/:id",
  (req, res, next) => validator(updateContact, req, res, next),
  ContactController.update
);
contactRouter.put("/:id/active", ContactController.active);

contactRouter.delete("/:id", ContactController.delete);

export default contactRouter;
