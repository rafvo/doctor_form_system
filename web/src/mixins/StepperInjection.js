import { exist } from "@/util/exist";

export default {
  inject: ["stepper", "stepperKey"],
  computed: {
    existInjectedStepper() {
      return exist(this.injectedStepper);
    },
    injectedStepper() {
      return this.stepper();
    },
    currentStep() {
      return this.existInjectedStepper
        ? this.injectedStepper.currentStep
        : 0;
    },
    totalSteps() {
      return this.existInjectedStepper ? this.injectedStepper.totalSteps : 0;
    },
  },
};
