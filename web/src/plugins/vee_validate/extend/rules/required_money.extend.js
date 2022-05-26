import { extend } from "vee-validate";

extend('required_money', {
    message: field => 'O ' + field + ' é obrigatório',
    validate: value => value > 0
});