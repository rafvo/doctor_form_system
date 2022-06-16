import stepperBus from "@/events/stepper";
import StepperInjection from "./StepperInjection";

export default {
  mixins: [StepperInjection],
  props: {
    goToStep: {
      type: [String, Number],
      default: 1,
      required: false,
    },
  },
  computed: {
    validGoToStep() {
      if (!this.currentStep) return false;
      return this.goToStep ? Boolean(this.goToStep < this.currentStep) : false;
    },
    goToStepObject() {
      return {
        stepperKey: this.stepperKey(),
        goToStep: this.goToStep,
      };
    },
  },
  methods: {
    stepperGoTo() {
      if (!this.validGoToStep) return;
      stepperBus.emitGoToStep(this.goToStepObject);
    },
    stepperNext() {
      stepperBus.emitNextClick(this.stepperKey());
    },
    stepperPrevious() {
      stepperBus.emitPreviousClick(this.stepperKey());
    },
  },
};
