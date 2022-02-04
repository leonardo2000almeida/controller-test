import { getConnection } from "typeorm";
import { Contact } from "../../domain/schema/contact.entity";

class ContactUseCases {
  static create = async (newContact: Contact) => {
    const contact = getConnection().getRepository(Contact);
    return await contact.save(newContact);
  };

  static readOne = async (id: string) => {
    const contact = getConnection().getRepository(Contact);
    return await contact.findOne(id);
  };

  static update = async (contactToUpdate: Contact) => {
    const contact = getConnection().getRepository(Contact);
    return await contact.update(contactToUpdate.id, contactToUpdate);
  };

  static delete = async (contactId: string) => {
    const contact = getConnection().getRepository(Contact);
    return await contact.update(contactId, { status: "inativo" });
  };
}

export default ContactUseCases;
