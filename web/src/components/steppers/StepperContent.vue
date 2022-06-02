<template>
  <div>
    <slot v-if="stepEnable"></slot>
  </div>
</template>

<script>
import Stepper from "@/domain/objects/stepper";

export default {
  props: {
    step: {
      type: [String, Number],
      default: 1,
      required: false,
    },
  },
  data() {
    return {
      stepper: new Stepper(),
    };
  },
  computed: {
    stepEnable() {
      return this.stepper.currentStep == this.step;
    },
  },
  mounted() {
    this.$root.$on("stepper", (stepper) => {
      this.stepper = Stepper.fromJson(stepper);
    });
  },
};
</script>

<style>
</style>