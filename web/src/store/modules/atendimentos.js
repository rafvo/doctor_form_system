import Vue from "vue";
import FormasPagamento from "@/domain/models/formas_pagamento";

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
  },
};
