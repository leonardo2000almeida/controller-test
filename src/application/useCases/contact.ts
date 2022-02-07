import { getConnection } from "typeorm";
import { Contact } from "../../domain/schema/contact.entity";
import { ContactAddress } from "../../domain/schema/contactAddress.entity";
import { contactFactory } from "../types/entities";

class ContactUseCases {
  static create = async (newContact: Contact) => {
    const contact = getConnection().getRepository(Contact);
    return await contact.save(newContact);
  };

  static readOne = async (id: string) => {
    const contact = getConnection().createQueryBuilder();
    return await contact
      .select()
      .distinct()
      .addFrom(Contact, "c")
      .innerJoin(ContactAddress, "ca", "ca.id = ca.id")
      .where({ id })
      .execute();
  };

  static update = async (contactToUpdate: Contact) => {
    const contact = getConnection().getRepository(Contact);
    return await contact.update(contactToUpdate.id, contactToUpdate);
  };

  static delete = async (contactId: string) => {
    const contact = getConnection().getRepository(Contact);
    return await contact.update(contactId, { status: "inativo" });
  };

  static createContact = (contact: contactFactory) => {
    return new Contact(
      contact.Nome,
      contact.Email,
      contact.Telefone,
      contact["CPF/CNPJ"],
      "ativo"
    );
  };
}

export default ContactUseCases;
