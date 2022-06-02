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
// import Stepper from "@/domain/objects/stepper";

export default {
  computed: {
    stepper() {
      return this.$store.state.stepper.model;
    },
    currentStep() {
      return this.stepper.currentStep ? this.stepper.currentStep : 0;
    },
    totalSteps() {
      return this.stepper.totalSteps ? this.stepper.totalSteps : 0;
    },
  },
};
</script>

<style>
</style>