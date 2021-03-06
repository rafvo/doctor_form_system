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
    validGoToStep(step) {
      return step ? Boolean(step < this.step) : false;
    },
    goToStep(step) {
      if (this.validGoToStep(step)) {
        this.Step = step;

      } else {
        this.$toast.error(`Não é possível ir até o passo ${step}`, {
          timeout: 2000,
        });
      }
    },
    previousStep() {
      if (this.isValidPreviousStep) this.Step--;
    },
    async nextStep() {
      const valid = await this.validate();
      if (!valid) return;

      if (this.isValidNextStep) this.Step++;
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

    stepperBus.onGoToStep(({ stepperKey, goToStep }) => {
      if (stepperKey == this.componentKey) {
        this.goToStep(goToStep);
      }
    });
  },
  destroyed() {
    stepperBus.offPreviousClick();
    stepperBus.offNextClick();
    stepperBus.offGoToStep();
  },
};
</script>

<style>
</style>