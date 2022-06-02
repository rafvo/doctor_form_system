<template>
  <div>
    <ValidationObserver ref="observer">
      <slot :currentStep="step"></slot>

      <slot
        name="previousStep"
        :currentStep="step"
        :isValidPreviousStep="isValidPreviousStep"
      >
        <b-button
          v-if="isValidPreviousStep"
          variant="outline-primary"
          @click.prevent="previousStep"
          >Anterior</b-button
        >
      </slot>

      <slot
        name="nextStep"
        :currentStep="step"
        :isValidNextStep="isValidNextStep"
      >
        <b-button
          v-if="isValidNextStep"
          variant="outline-primary"
          @click.prevent="nextStep"
          >Próximo</b-button
        >
      </slot>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
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
      },
    },
    isValidPreviousStep() {
      return Boolean(this.step != 1);
    },
    isValidNextStep() {
      return Boolean(this.step != this.steps);
    },
  },
  watch: {
    currentStep() {
      this.step = this.currentStep;
    },
  },
  methods: {
    validate() {
      return this.$refs.observer.validate();
    },
    previousStep() {
      this.step--;
    },
    async nextStep() {
      var valid = await this.validate();
      if (!valid) return;

      this.step++;
    },
    emitInput() {
      this.$emit("input", this.step);
    },
  },
  mounted() {
    this.step = this.currentStep;
  },
};
</script>

<style>
</style>