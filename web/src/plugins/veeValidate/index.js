import Vue from "vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import "./localize";
import "./extend";

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

/*

* documentação:
* https://vee-validate.logaretm.com/v3

*/