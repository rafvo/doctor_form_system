<template>
  <div>
    <InlineRow class="stepper-progress-row">
      <b-progress :max="totalSteps">
        <b-progress-bar :value="currentStep" variant="primary"></b-progress-bar>
      </b-progress>
      <span class="ml-10" v-if="currentStep">
        {{ currentStep }}
        <span class="space" v-if="totalSteps">de {{ totalSteps }}</span>
      </span>
    </InlineRow>
  </div>
</template>
 
<script>
import InlineRow from "../rows/InlineRow.vue";
export default {
  components: { InlineRow },
  inject: ["stepper"],
  computed: {
    injectedStepper() {
      return this.stepper();
    },
    currentStep() {
      return this.injectedStepper.currentStep
        ? this.injectedStepper.currentStep
        : 0;
    },
    totalSteps() {
      return this.injectedStepper.totalSteps
        ? this.injectedStepper.totalSteps
        : 0;
    },
  },
};
</script>

<style scoped>
</style>