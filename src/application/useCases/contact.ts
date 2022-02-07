import { getConnection } from "typeorm";
import { Contact } from "../../domain/schema/contact.entity";
import { ContactAddress } from "../../domain/schema/contactAddress.entity";
import { updateContact } from "../../interface/http/validations/contact";
import { contactFactory } from "../types/entities";

class ContactUseCases {
  static create = async (newContact: Contact) => {
    const contact = getConnection().getRepository(Contact);
    return await contact.save(newContact);
  };

  static readOne = async (id: string) => {
    const client = getConnection().getRepository(Contact);
    return await client.findOne({ where: { id } });
  };

  static get = async (id: string) => {
    const [contact] = await getConnection()
      .createQueryBuilder()
      .select()
      .from(Contact, "c")
      .innerJoin(ContactAddress, "ca", "ca.contactId = c.id")
      .where("c.id = :id", { id })
      .execute();
    return contact;
  };

  static update = async (contactToUpdate: any) => {
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
