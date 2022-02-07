import { csvContact } from "../../types/contact";

export const parser = (csvString: string): csvContact[] => {
  const contacts: object[] = [];
  const [keys, ...values] = csvString.split("\n");
  const headers = keys.trim().split(",");

  values.map((value) => {
    let contact: Object = {};
    const contactInfo = value.trim().split(",");

    contactInfo.map((info, i) => {
      Object.assign(contact, { [headers[i]]: info });
    });

    contacts.push(contact);
  });
  return <[csvContact]>contacts;
};

export const objectToCsvPattern = (contact: any) => ({
  Nome: contact.name,
  Email: contact.email,
  Telefone: contact.phone,
  "CPF/CNPJ": contact.cpfCnpj,
  Tipo: contact.type,
  CEP: contact?.address?.zipcode || contact?.zipcode,
  Número: contact?.address?.number || contact?.number,
  Complemento: contact?.address?.complement || contact?.complement,
  Bairro: contact?.address?.district || contact?.district,
  Cidade: contact?.address?.city || contact?.city,
  Estado: contact?.address?.state || contact?.state,
});
