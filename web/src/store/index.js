import Vue from "vue";
import Vuex from "vuex";
import cidades from "./modules/cidades";
import especialidades from "./modules/especialidades";
import estados from "./modules/estados";
import profissionais from "./modules/profissionais";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    cidades,
    especialidades,
    estados,
    profissionais
  },
});
