import { Contact } from "../../domain/schema/contact.entity";
import { ContactAddress } from "../../domain/schema/contactAddress.entity";
import { addressFactory } from "../types/entities";

export const createAddress = (address: addressFactory, contact: Contact) => {
  return new ContactAddress(
    address.CEP,
    address.Logradouro,
    address.Número,
    address.Complemento,
    address.Bairro,
    address.Cidade,
    address.Estado,
    contact
  );
};
