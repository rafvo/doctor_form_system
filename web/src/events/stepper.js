import Vue from 'vue';

export default new Vue({
  methods: {
    /*previous step*/
    emitPreviousClick(stepperEvent) {
      this.$emit("previous:click", stepperEvent);
    },
    onPreviousClick(stepperEvent) {
      this.$on("previous:click", stepperEvent);
    },
    offPreviousClick(stepperEvent = null) {
      this.$off("previous:click", stepperEvent);
    },

    /*next step*/
    emitNextClick(stepperEvent) {
      this.$emit("next:click", stepperEvent);
    },
    onNextClick(stepperEvent) {
      this.$on("next:click", stepperEvent);
    },
    offNextClick(stepperEvent = null) {
      this.$off("next:click", stepperEvent);
    },
  },
});
