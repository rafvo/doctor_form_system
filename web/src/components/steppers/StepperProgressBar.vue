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
import StepperInjection from "@/mixins/StepperInjection"
import InlineRow from "@/components/rows/InlineRow.vue";

export default {
  mixins: [StepperInjection],
  components: { InlineRow },
};
</script>

<style scoped>
</style>