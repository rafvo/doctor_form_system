import Stepper from "@/domain/objects/stepper";

export default {
  namespaced: true,
  state: {
    model: new Stepper(),
    previousClick: 0,
    nextClick: 0,
  },
  getters: {
    previousClickEvent(state) {
      return state.previousClick;
    },
    nextClickEvent(state ) {
      return state.nextClick;
    },
  },
  mutations: {
    setModel(state, payload) {
      state.model = payload;
    },
    setPreviousClick(state) {
      state.previousClick+=1;
    },
    setNextClick(state) {
      state.nextClick+=1;
    },
  },
  actions: {
    emitModel({ commit }, payload) {
      commit("setModel", payload);
    },
    emiPreviousButtonClick({ commit }) {
      commit("setPreviousClick");
    },
    emitNextButtonClick({ commit }) {
      commit("setNextClick");
    },
  },
};
