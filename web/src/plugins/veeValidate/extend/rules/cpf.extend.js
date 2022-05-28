import { extend } from "vee-validate";
import validator from "@/plugins/veeValidate/validators/cpf.validator";

extend("cpf", {
  validate: (value) => validator(value),
  message: "CPF Inválido",
});
