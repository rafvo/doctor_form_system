import Vue from "vue";
import App from "./App.vue";
import "./plugins/bootstrapVue";
import "./plugins/vueMask";
import "./plugins/veeValidate";
import "./plugins/vMoney";
import "./plugins/vueToastification";
import "./directives";
import "./assets/scss/app.scss"
import store from './store'
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
