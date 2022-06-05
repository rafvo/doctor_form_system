<template>
  <div>
    <slot v-if="stepEnable"></slot>
  </div>
</template>

<script>
export default {
  inject: ["stepper"],
  props: {
    step: {
      type: [String, Number],
      default: 1,
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
  },
};
</script>

<style>
</style>