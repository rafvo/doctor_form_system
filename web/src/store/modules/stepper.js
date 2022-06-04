import Vue from "vue";
import { uniqueId } from "@/util/uniqueId";
import StepperEvent from "@/domain/objects/stepperEvent";

export default {
  namespaced: true,
  state: {
    previousClick: {},
    nextClick: {},
  },
  getters: {},
  mutations: {
    setPreviousClick(state, stepperKey) {
      let obj = {};

      Vue.set(
        obj,
        stepperKey,
        new StepperEvent({
          stepperKey: stepperKey,
          value: uniqueId(),
        })
      );

      state.previousClick = obj;
    },
    setNextClick(state, stepperKey) {
      let obj = {};

      Vue.set(
        obj,
        stepperKey,
        new StepperEvent({
          stepperKey: stepperKey,
          value: uniqueId(),
        })
      );

      state.nextClick = obj;
    },
  },
  actions: {
    emitPreviousButtonClick({ commit }, stepperKey) {
      if (!stepperKey) return;
      commit("setPreviousClick", stepperKey);
    },
    emitNextButtonClick({ commit }, stepperKey) {
      if (!stepperKey) return;
      commit("setNextClick", stepperKey);
    },
  },
};
