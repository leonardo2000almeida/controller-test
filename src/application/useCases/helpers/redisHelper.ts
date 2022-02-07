import RedisUseCases from "../redis";

export const keysParser = async (keys: [string]) => {
  const keysInObject: object[] = [];

  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const value = <string>await RedisUseCases.getByKey(key);
    keysInObject.push(JSON.parse(value));
  }

  return keysInObject;
};
