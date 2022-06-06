import Vue from "vue";
import Vuex from "vuex";
import cidades from "./modules/cidades";
import especialidades from "./modules/especialidades";
import estados from "./modules/estados";
import profissionais from "./modules/profissionais";

// import createPersistedState from "vuex-persistedstate";
// import SecureLS from "secure-ls";

// var ls = new SecureLS({
//   encodingType: "rc4",
//   isCompression: false,
//   encryptionSecret: "s3cr3tPa$$w0rd@123",
// });

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    cidades,
    especialidades,
    estados,
    profissionais,
  },
  // plugins: [
  //   createPersistedState({
  //     key: "vuex",
  //     storage: {
  //       getItem: (key) => {
  //         try {
  //           return ls.get(key);
  //         } catch (_) {
  //           ls.clear();
  //         }
  //       },
  //       setItem: (key, value) => ls.set(key, value),
  //       removeItem: (key) => ls.remove(key),
  //     },
  //   }),
  // ],
});
