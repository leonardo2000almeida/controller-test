import { getConnection } from "typeorm";
import { Contact } from "../../domain/schema/contact.entity";
import { ContactAddress } from "../../domain/schema/contactAddress.entity";
import { addressFactory } from "../types/entities";

class AddressUseCases {
  static create = async (newContact: ContactAddress) => {
    try {
      const address = getConnection().getRepository(ContactAddress);
      return await address.save(newContact);
    } catch (err: any) {
      console.log("Error on contact use case, method: create\n", err);
    }
  };

  static readOne = async (id: string) => {
    try {
      const address = getConnection().getRepository(ContactAddress);
      return await address.findOne(id);
    } catch (err) {
      console.log("Error on contact use case, method: readOne\n", err);
    }
  };

  static update = async (contactToUpdate: ContactAddress) => {
    try {
      const address = getConnection().getRepository(ContactAddress);
      return await address.update(contactToUpdate.id, contactToUpdate);
    } catch (err) {
      console.log("Error on contact use case, method: update\n", err);
    }
  };

  static createAddress = (address: addressFactory, contact: Contact) =>
    new ContactAddress(
      address.CEP,
      address.Logradouro,
      address.Número,
      address.Complemento,
      address.Bairro,
      address.Cidade,
      address.Estado,
      contact
    );
}

export default AddressUseCases;
