import Vue from "vue";
import App from "./App.vue";

import "@/plugins/vue_bootstrap";
import "@/plugins/vue_mask";
import "@/plugins/vee_validate";
import "@/directives";
import "@/assets/scss/app.scss";

import router from "./router";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
