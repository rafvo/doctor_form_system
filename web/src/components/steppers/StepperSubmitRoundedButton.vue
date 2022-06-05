<template>
  <div>
    <InlineRow
      :class="{ 'd-flex justify-content-center text-center': centered }"
    >
      <RoundedButton
        button-classes="bnt-cta-0"
        :title="title"
        spinner-variant="light"
        :loading="loading"
        block
        uppercase-title
        @click:prevent="onClickPrevent"
      />
    </InlineRow>
  </div>
</template>

<script>
import { exist } from "@/util/exist";
import stepperBus from "@/events/stepper";
import InlineRow from "@/components/rows/InlineRow.vue";
import RoundedButton from "@/components/buttons/RoundedButton.vue";

export default {
  inject: ["stepper", "stepperKey", "stepperInstance"],
  components: {
    InlineRow,
    RoundedButton,
  },
  props: {
    title: {
      type: String,
      default: "{Title}",
      required: false,
    },
    centered: {
      type: Boolean,
      default: false,
      required: false,
    },
    goToNextStep: {
      type: Boolean,
      default: true,
      required: false,
    },
    loading: {
       type: Boolean,
      default: true,
      required: false,
    }
  },
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
        : null;
    },
    totalSteps() {
      return this.existInjectedStepper ? this.injectedStepper.totalSteps : null;
    },
    nextStep() {
      let step = this.currentStep;
      return this.existInjectedStepper ? (step += 1) : null;
    },
    validNextStep() {
      return this.nextStep ? this.nextStep <= this.totalSteps : false;
    },
    goToStepObject() {
      return {
        stepperKey: this.stepperKey(),
        goToStep: this.nextStep,
      };
    },
  },
  methods: {
    async onClickPrevent(event) {
      const instance = this.stepperInstance()
      const valid = await instance.validate();
      if (!valid) return;

      this.$emit("click:prevent", event);
      if(this.goToNextStep) this.rootEmit();
    },
    rootEmit() {
      if (!this.validNextStep) return;
      stepperBus.emitGoToStep(this.goToStepObject);
    },
  },
};
</script>

<style>
</style>