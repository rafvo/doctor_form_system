import Vue from "vue";
import Axios from "@/interceptors/axios";
import Profissionais from "@/domain/models/profissionais";
import ProfissionaisFiltros from "@/domain/filters/profissionais";
import { uniqueId } from "@/util/uniqueId";

export default {
  namespaced: true,
  state: {
    data: {},
    all: {},
  },
  getters: {},
  mutations: {
    insert(state, model){
      Vue.set(state.data, model.id, model);
    },
    update(state, { id, model }) {
      state.data[id] = model;
    },
    delete(state, id) {
      Vue.delete(state.data, id);
    },
    allAdd(state, { id, model }) {
      Vue.set(state.all, id, model);
    },
  },
  actions: {
    all({ commit }, all) {
      if (!all) all = [];

      for (let model of all) {
        commit("all", model);
      }
    },
    getAll({ dispatch }, { professionalFilter = new ProfissionaisFiltros() }) {
      return new Promise((resolve, reject) => {
        Axios.get("/profissionais", { params: professionalFilter })
          .then((response) => {
            const list = response.data;
            dispatch("all", list);
            resolve(list);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    insert({ commit }, { professional = new Profissionais() }) {
      professional.id = uniqueId();
      commit("insert", professional);
    },
  },
};
