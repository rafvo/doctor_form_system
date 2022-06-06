<template>
  <div>
    <InlineRow
      :class="{ 'd-flex justify-content-center text-center': centered }"
    >
      <RoundedButton
        class="btn-primary-0"
        :title="title"
        :disabled="!validGoToStep"
        @click:prevent="onClickPrevent"
      />
      <b-icon
        v-if="!validGoToStep"
        class="ml-5"
        icon="exclamation-circle"
        style="width: 20px; height: 20px"
        animation="fade"
        v-b-tooltip.hover
        :title="`Não é possível retornar para o passo ${goToStep}`"
      ></b-icon>
    </InlineRow>
  </div>
</template>

<script>
import { exist } from "@/util/exist";
import stepperBus from "@/events/stepper";
import InlineRow from "@/components/rows/InlineRow.vue";
import RoundedButton from "@/components/buttons/RoundedButton.vue";

export default {
  inject: ["stepper", "stepperKey"],
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
    goToStep: {
      type: [String, Number],
      default: 1,
      required: false,
    },
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
    validGoToStep() {
      if (!this.currentStep) return false;
      return this.goToStep ? Boolean(this.goToStep < this.currentStep) : false;
    },
    goToStepObject() {
      return {
        stepperKey: this.stepperKey(),
        goToStep: this.goToStep,
      };
    },
  },
  methods: {
    onClickPrevent(event) {
      this.$emit("click:prevent", event);
      this.rootEmit();
    },
    rootEmit() {
      if (!this.validGoToStep) return;
      stepperBus.emitGoToStep(this.goToStepObject);
    },
  },
};
</script>

<style>
</style>