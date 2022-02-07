import { Request, Response } from "express";
import { parser } from "../../../application/useCases/helpers/csvHelper.";
import redisUseCases from "../../../application/useCases/redis";
import { validateCNPJ, validateCPF, validateCep } from "validations-br";
import { getConnection } from "typeorm";
import { Contact } from "../../../domain/schema/contact.entity";
import { ContactAddress } from "../../../domain/schema/contactAddress.entity";
import ContactUseCases from "../../../application/useCases/contact";
import AddressUseCases from "../../../application/useCases/address";

class CsvController {
  static export = async (req: Request, res: Response) => {
    try {
      const contacts = await redisUseCases.getAll();
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
      const logs = [];
      let success = 0;
      let fails = 0;
      const csv = req.body;
      const contacts = parser(csv);
      const clientContact = getConnection().getRepository(Contact);
      const clientAddress = getConnection().getRepository(ContactAddress);

      for (let index = 0; index < contacts.length; index++) {
        const contact = contacts[index];

        const isAvalidDocument =
          contact["CPF/CNPJ"]?.length === 11
            ? validateCPF(contact["CPF/CNPJ"])
            : validateCNPJ(contact["CPF/CNPJ"]);

        const isAvalidCep = validateCep(contact.CEP);

        if (isAvalidDocument && isAvalidCep) {
          try {
            const contactToImport = ContactUseCases.createContact(contact);
            const newContact = await ContactUseCases.create(contactToImport);
            const addressToImport = AddressUseCases.createAddress(
              contact,
              newContact
            );
            await clientAddress.save(addressToImport);

            if (newContact) {
              contact.id = newContact.id;
              Object.assign(contact, { type: newContact.type });
              await redisUseCases.insertContact(contact);
              success++;
            }
          } catch (err: any) {
            logs.push({ contact: contact, invalidArguments: err?.detail });
            fails++;
          }
        } else {
          let invalidArguments = [];

          if (!isAvalidDocument) invalidArguments.push("cpf/cnpj invalid");

          if (!isAvalidCep) invalidArguments.push("cep invalid");

          logs.push({ contact: contact, invalidArguments });
          fails++;
        }
      }

      res.status(201).json({
        message: `CSV imported, success: ${success}, fails: ${fails}`,
        status: 201,
      });

      if (logs.length > 0) console.log("Invalid registers: \n", logs);
    } catch (err) {
      res.status(500).json({
        message: "Error no servidor",
        status: 500,
      });
    }
  };
}

export default CsvController;
