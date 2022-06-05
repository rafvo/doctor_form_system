import { extend } from "vee-validate";
import { exist } from "@/util/exist";

extend("exist", {
  message: (field) => `${field} é obrigatório`,
  validate: (value) => {
    return exist(value);
  },
});
