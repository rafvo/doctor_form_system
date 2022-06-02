<template>
  <div>
    <ValidationObserver ref="observer">
      <slot :currentStep="step"></slot>

      <b-row :class="stepActionsClasses">
        <b-col
          :cols="previousStepButtonGrid"
          v-if="isValidPreviousStep && withPreviousStepButton"
        >
          <slot name="previousStep" :currentStep="step">
            <StepperPreviousButton
              :emit-root-event="false"
              @click:prevent="previousStep"
            >
              Anterior
            </StepperPreviousButton>
          </slot>
        </b-col>
        <b-col
          :cols="nextStepButtonGrid"
          v-if="isValidNextStep && withNextStepButton"
        >
          <slot name="nextStep" :currentStep="step">
            <StepperNextButton
              :emit-root-event="false"
              @click:prevent="nextStep"
            >
              Próximo
            </StepperNextButton>
          </slot>
        </b-col>
      </b-row>
    </ValidationObserver>
  </div>
</template>

<script>
// import StepperEvent from "@/events/stepper";
import Stepper from "@/domain/objects/stepper";
import StepperPreviousButton from "./StepperPreviousButton.vue";
import StepperNextButton from "./StepperNextButton.vue";

export default {
  components: {
    StepperPreviousButton,
    StepperNextButton,
  },
  props: {
    steps: {
      type: [String, Number],
      default: 2,
      required: false,
    },
    currentStep: {
      type: [String, Number],
      default: 1,
      required: false,
    },
    stepActionsClasses: {
      type: String,
      default: "",
      required: false,
    },
    previousStepButtonGrid: {
      type: [String, Number],
      default: "12",
      required: false,
    },
    nextStepButtonGrid: {
      type: [String, Number],
      default: "12",
      required: false,
    },
    withPreviousStepButton: {
      type: Boolean,
      default: false,
      required: false,
    },
    withNextStepButton: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      step: null,
    };
  },
  computed: {
    Step: {
      get() {
        return this.step;
      },
      set(payload) {
        this.step = payload;
        this.emitInput();
        this.rootEmit();
      },
    },
    isValidPreviousStep() {
      return Boolean(this.step != 1);
    },
    isValidNextStep() {
      return Boolean(this.step != this.steps);
    },
    previousClickEvent() {
      return this.$store.state.stepper.previousClick;
    },
    nextClickEvent() {
      return this.$store.state.stepper.nextClick;
    },
  },
  watch: {
    currentStep() {
      this.step = this.currentStep;
    },
    step() {
      this.rootEmit();
    },
    previousClickEvent() {
      if (this.isValidPreviousStep) {
        this.previousStep();
      }
    },
    nextClickEvent() {
      if (this.isValidNextStep) {
        this.nextStep();
      }
    },
  },
  methods: {
    rootEmit() {
      this.$store.dispatch(
        "stepper/emitModel",
        new Stepper({
          currentStep: this.step,
          totalSteps: this.steps,
        })
      );
    },
    validate() {
      return this.$refs.observer.validate();
    },
    previousStep() {
      this.Step--;
    },
    async nextStep() {
      var valid = await this.validate();
      if (!valid) return;

      this.Step++;
    },
    emitInput() {
      this.$emit("input", this.step);
    },
  },
  mounted() {
    this.step = this.currentStep;
    this.rootEmit();
  },
};
</script>

<style>
</style>

<!--

    // StepperEvent.onStepperPreviousButton((event) => {
    //   console.log(event);
    //   if (this.isValidPreviousStep) {
    //     this.previousStep();
    //   }
    // });

    // StepperEvent.onStepperNextButton((event) => {
    //   console.log(event);
    //   if (this.isValidNextStep) {
    //     this.nextStep();
    //   }
    // });
      // StepperEvent.emitStepper(
      //   new Stepper({ currentStep: this.step, totalSteps: this.steps })
      // );

      -->