import { extend } from "vee-validate";

extend('required_money', {
    message: field => `${field} é obrigatório`,
    validate: value => value > 0
});