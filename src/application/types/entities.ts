import { Contact } from "../../domain/schema/contact.entity";

export type contactFactory = {
  Nome: string;
  Email: string;
  Telefone: string;
  "CPF/CNPJ": string;
};

export type addressFactory = {
  CEP: string;
  Logradouro: string;
  Número: string;
  Complemento: string;
  Bairro: string;
  Cidade: string;
  Estado: string;
};
