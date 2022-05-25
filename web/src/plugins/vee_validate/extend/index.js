import { extend } from "vee-validate";
import "./rules/cpf.extend";
import * as rules from "vee-validate/dist/rules";
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});