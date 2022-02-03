import { getConnection } from "typeorm";
import { Contact } from "../../domain/schema/contact.entity";

class ContactUseCases {
  static create = async (newContact: Contact) => {
    try {
      const contact = getConnection().getRepository(Contact);
      return await contact.save(newContact);
    } catch (err) {
      console.log("Error on contact use case, method: create\n", err);
    }
  };

  static readOne = async (id: string) => {
    try {
      const contact = getConnection().getRepository(Contact);
      return await contact.findOne(id);
    } catch (err) {
      console.log("Error on contact use case, method: readOne\n", err);
    }
  };

  static update = async (contactToUpdate: Contact) => {
    try {
      const contact = getConnection().getRepository(Contact);
      return await contact.update(contactToUpdate.id, contactToUpdate);
    } catch (err) {
      console.log("Error on contact use case, method: update\n", err);
    }
  };

  static delete = async (contactId: string) => {
    try {
      const contact = getConnection().getRepository(Contact);
      return await contact.update(contactId, { status: "inativo" });
    } catch (err) {
      console.log("Error on contact use case, method: delete\n", err);
    }
  };
}

export default ContactUseCases;
