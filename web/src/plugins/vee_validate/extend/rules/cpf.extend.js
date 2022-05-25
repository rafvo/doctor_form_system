import { extend } from "vee-validate";
import validator from "@/plugins/vee_validate/validators/cpf.validator";

extend("cpf", {
  validate: (value) => validator(value),
  message: "CPF Inválido",
});
