<template>
  <div>
    <slot v-if="stepEnable"></slot>
  </div>
</template>

<script>
// import Stepper from "@/domain/objects/stepper";

export default {
  props: {
    step: {
      type: [String, Number],
      default: 1,
      required: false,
    },
  },
  computed: {
    stepper() {
      return this.$store.state.stepper.model;
    },
    stepEnable() {
      return this.stepper.currentStep == this.step;
    },
  },
};
</script>

<style>
</style>