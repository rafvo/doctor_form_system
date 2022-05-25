<template>
  <div>
    <slot v-if="stepEnable"></slot>
  </div>
</template>

<script>
export default {
  props: {
    currentStep: {
      type: [String, Number],
      default: 1,
      required: false,
    },
    step: {
      type: [String, Number],
      default: 1,
      required: false,
    },
  },
  computed: {
    stepEnable() {
      return this.currentStep == this.step;
    },
  },
};
</script>

<style>
</style>