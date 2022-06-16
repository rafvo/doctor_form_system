<template>
  <ValidationObserver ref="observer" v-slot="{ invalid, valid }">
    <b-tab
      :active="stepEnable"
      :disabled="stepDisable"
      @click.prevent="goToStep"
    >
      <template #title>
        <slot name="title">
          <b-icon icon="check-circle" v-if="validStep(valid)"></b-icon>
          <b-icon
            icon="exclamation-triangle"
            v-else-if="invalid && stepEnable && withInvalidIcon()"
          ></b-icon>
          {{ title }}
        </slot>
      </template>
      <slot v-if="stepEnable"></slot>
    </b-tab>
  </ValidationObserver>
</template>

<script>
import stepperBus from "@/events/stepper";

export default {
  inject: ["stepper", "stepperKey", "withValidIcon", "withInvalidIcon"],
  props: {
    step: {
      type: [String, Number],
      default: 1,
      required: false,
    },
    title: {
      type: String,
      default: "{Tab}",
      required: false,
    },
  },
  computed: {
    injectedStepper() {
      return this.stepper();
    },
    stepEnable() {
      return this.injectedStepper.currentStep == this.step;
    },
    stepDisable() {
      return (
        this.step > this.injectedStepper.currentStep ||
        (this.injectedStepper.currentStep == this.injectedStepper.totalSteps &&
          this.isCompleted)
      );
    },
    isCompleted() {
      return this.step < this.injectedStepper.currentStep;
    },
    goToStepObject() {
      return {
        stepperKey: this.stepperKey(),
        goToStep: this.step,
      };
    },
  },
  methods: {
    validStep(validObserver = false) {
      return Boolean(
        (this.isCompleted || (validObserver && this.stepEnable)) &&
          this.withValidIcon()
      );
    },
    goToStep() {
      if (this.stepDisable || this.stepEnable) return;
      stepperBus.emitGoToStep(this.goToStepObject);
    },
  },
};
</script>

<style>
</style>