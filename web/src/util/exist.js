import Exist from "./objects/exist";

export function exist(value) {
  const obj = new Exist(value);
  return obj.exist();
}
