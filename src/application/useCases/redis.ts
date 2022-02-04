import { redis } from "../../infrastructure/repository/redis";
import { excludeHeader, returnContactObject } from "./helpers/csvHelper.";
import objToCsv from "objects-to-csv";

class RedisUseCases {
  static create = async (csv: string) => {
    const contacts: any = returnContactObject(csv) || [];
    const csvOld = await this.get();
    const client = await redis();

    const csvToImport = await new objToCsv(contacts).toString();

    if (csvOld?.includes("[object")) {
      await client?.SET("csv", csvToImport);
    } else {
      await client?.SET("csv", csvToImport + excludeHeader(csvToImport));
    }
  };

  static get = async () => {
    try {
      const client = await redis();
      return client?.get("csv");
    } catch (err) {
      return "error";
    }
  };
}

export default RedisUseCases;
