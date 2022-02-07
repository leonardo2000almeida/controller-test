import { redis } from "../../infrastructure/repository/redis";
import { objectToCsvPattern, parser } from "./helpers/csvHelper.";
import objToCsv from "objects-to-csv/";
import { keysParser } from "./helpers/redisHelper";
import { csvContact } from "../types/contact";

class RedisUseCases {
  static import = async (csv: string) => {
    try {
      const contacts = parser(csv);

      for (let index = 0; index < contacts.length; index++) {
        const contact: any = contacts[index];
        contact.type = contact.cpfCnpj.length === 11 ? "PF" : "PJ";

        await this.insertContact(contact);
      }

      return true;
    } catch (err) {
      console.log("error on RedisUseCases.import: \n", err);
    }
  };

  static get = async (id: string) => {
    try {
      const client = await redis();
      return client?.get(`userId - ${id}`);
    } catch (err) {
      console.log("Error on RedisUseCases.get", err);
    }
  };

  static getByKey = async (key: string) => {
    try {
      const client = await redis();
      return client?.get(key);
    } catch (err) {
      console.log("Error on RedisUseCases.getByKey", err);
    }
  };

  static getAll = async () => {
    try {
      const client = await redis();
      let keys = <[string]>await client?.keys("*");
      const keysObject = await keysParser(keys);
      return keys.length > 0 ? await new objToCsv(keysObject).toString() : [];
    } catch (err) {
      console.log("Error on RedisUseCases.getAll", err);
    }
  };

  static insertContact = async (contact: any) => {
    try {
      let newContact = contact;
      const client = await redis();

      if (contact?.name) {
        newContact = objectToCsvPattern(contact);
      }

      await client?.set(
        `userId - ${contact.id}`,
        JSON.stringify(newContact)
      );
    } catch (err) {
      console.log("Error on RedisUseCases.insertContact", err);
    }
  };
}

export default RedisUseCases;
