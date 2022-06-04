<template>
  <div>
    <b-row>
      <b-col cols="10">
        <b-progress :max="totalSteps">
          <b-progress-bar
            :value="currentStep"
            variant="primary"
          ></b-progress-bar>
        </b-progress>
      </b-col>
      <b-col>
        <span v-if="currentStep">
          {{ currentStep }}
          <span class="space" v-if="totalSteps">de {{ totalSteps }}</span>
        </span>
      </b-col>
    </b-row>
  </div>
</template>
 
<script>
export default {
  inject: ["stepper"],
  computed: {
    injectedStepper() {
      return this.stepper();
    },
    currentStep() {
      return this.injectedStepper.currentStep ? this.injectedStepper.currentStep : 0;
    },
    totalSteps() {
      return this.injectedStepper.totalSteps ? this.injectedStepper.totalSteps : 0;
    },
  },
};
</script>

<style>
</style>

<!--
// import Stepper from "@/domain/objects/stepper";
-->