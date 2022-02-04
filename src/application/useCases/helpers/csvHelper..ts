const parser = (csvString: string): [{}] => {
  let contacts: [{}] = [];
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
  return contacts;
};

export const returnContactObject = (csv: string) => {
  try {
    const contacts = parser(csv);

    contacts.forEach((contact: any) => {
      if (contact.Nome) {
        if (contact["CPF/CNPJ"].lenght == 11)
          Object.assign(contact, { type: "PF" });
        else Object.assign(contact, { type: "PJ" });
      }
    });
    return contacts;
  } catch (err) {
    return err;
  }
};

export const excludeHeader = (csv: string) => {
  const [keys, ...values] = csv.split("\n");
 return values.reduce((csv, key) => `${csv}\n${key}`);
};
