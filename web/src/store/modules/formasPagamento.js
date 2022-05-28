import Vue from "vue";
// import Estados from "@/domain/model/estados";

export default {
  namespaced: true,
  state: {
    all: {},
    active: false,
  },
  getters: {
    active(state) {
      return state.active ? state.all[state.active] : false;
    },
  },
  mutations: {
    active(state, active) {
      state.active = active;
    },
    flush(state) {
      state.all = {};
    },
    add(state, model) {
      Vue.set(state.all, model.id, model);
    },
    update(state, { id, model }) {
      state.all[id] = model;
    },
    delete(state, id) {
      Vue.delete(state.all, id);
    },
  },
  actions: {
    all({ commit }, all) {
      if (!all) all = [];

      for (let model of all) {
        commit("add", model);
      }
    },
    getAll({ dispatch }) {
      return;
    },
    getPaymentMethods({ dispatch }, { attendanceId }) {
      const paymentMethods = FormasPagamento.getAll();

      return paymentMethods.map((e) => {
        e["formaPagamentoId"] = null;
        return e;
      });
    },
  },
};
