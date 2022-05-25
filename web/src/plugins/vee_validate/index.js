import Vue from "vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import "@/plugins/vee_validate/localize";
import "@/plugins/vee_validate/extend";

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

/*

* documentação:
* https://vee-validate.logaretm.com/v3

*/