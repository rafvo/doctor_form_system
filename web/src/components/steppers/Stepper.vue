<template>
  <div>
    <ValidationObserver ref="observer">
      <slot :currentStep="step"></slot>
    </ValidationObserver>
  </div>
</template>

<script>
import stepperBus from "@/events/stepper";
import Stepper from "@/domain/objects/stepper";

export default {
  props: {
    steps: {
      type: [String, Number],
      default: 2,
      required: false,
    },
    currentStep: {
      type: [String, Number],
      default: 1,
      required: false,
    },
  },
  provide() {
    return {
      stepperKey: () => this.componentKey,
      stepper: () => this.stepper,
    };
  },
  data() {
    return {
      step: null,
    };
  },
  computed: {
    Step: {
      get() {
        return this.step;
      },
      set(payload) {
        this.step = payload;
        this.emitInput();
      },
    },
    componentKey() {
      return this._uid;
    },
    isValidPreviousStep() {
      return Boolean(this.step != 1);
    },
    isValidNextStep() {
      return Boolean(this.step != this.steps);
    },
    stepper() {
      return new Stepper({
        key: this.componentKey,
        currentStep: this.step,
        totalSteps: this.steps,
      });
    },
  },
  watch: {
    currentStep() {
      this.step = this.currentStep;
    },
  },
  methods: {
    validate() {
      return this.$refs.observer.validate();
    },
    previousStep() {
      this.Step--;
    },
    async nextStep() {
      var valid = await this.validate();
      if (!valid) return;

      this.Step++;
    },
    emitInput() {
      this.$emit("input", this.step);
    },
  },
  mounted() {
    this.step = this.currentStep;

    stepperBus.onPreviousClick((stepperKey) => {
      if (this.isValidPreviousStep && stepperKey == this.componentKey) {
        this.previousStep();
      }
    });

    stepperBus.onNextClick((stepperKey) => {
      if (this.isValidNextStep && stepperKey == this.componentKey) {
        this.nextStep();
      }
    });
  },
  destroyed() {
    stepperBus.offPreviousClick();
    stepperBus.offNextClick();
  },
};
</script>

<style>
</style>