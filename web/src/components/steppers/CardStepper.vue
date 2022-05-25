<template>
  <div>
    <!-- previous step button -->
    <b-row v-if="previousStepEnable">
      <b-col>
        <RoundedButton title="Anterior" @click:prevent="Step -= 1" />
      </b-col>
    </b-row>
    <Card centered>
      <!-- step content -->
      <b-row>
        <b-col>
          <slot :name="slotCurrentStep"></slot>
        </b-col>
      </b-row>

      <!-- next step button -->
      <b-row v-if="nextStepEnable">
        <b-col>
          <RoundedButton title="Próximo" />
        </b-col>
      </b-row>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/cards/Card.vue";
import RoundedButton from "@/components/buttons/RoundedButton.vue";

export default {
  components: {
    Card,
    RoundedButton,
  },
  props: {
    steps: {
      type: Number,
      default: 2,
      required: false,
    },
    currentStep: {
      type: Number,
      default: 1,
      required: false,
    },
  },
  data() {
    return {
      step: 1,
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
      },
    },
    validCurrentStep() {
      return this.currentStep ? this.currentStep : 1;
    },
    slotCurrentStep() {
      return `step:${this.validCurrentStep}`;
    },
    previousStepEnable() {
      return this.currentStep > 1;
    },
    nextStepEnable() {
      return this.currentStep < this.steps;
    },
  },
  watch: {
    currentStep() {
      this.Step = this.currentStep;
    },
  },
  methods: {
    emitInput() {
      this.$emit("input", this.step);
    },
  },
  created() {
    this.step = this.currentStep;
  },
};
</script>

<style>
</style>