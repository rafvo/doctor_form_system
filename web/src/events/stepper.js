import Vue from "vue";

export default new Vue({
  methods: {
    /*previous step*/
    emitPreviousClick(stepperKey) {
      this.$emit("previous:click", stepperKey);
    },
    onPreviousClick(callback) {
      this.$on("previous:click", callback);
    },
    offPreviousClick(callback = null) {
      this.$off("previous:click", callback);
    },

    /*next step*/
    emitNextClick(stepperKey) {
      this.$emit("next:click", stepperKey);
    },
    onNextClick(callback) {
      this.$on("next:click", callback);
    },
    offNextClick(callback = null) {
      this.$off("next:click", callback);
    },

    /*go to step*/
    emitGoToStep({ stepperKey, goToStep }) {
      this.$emit("goToStep", { stepperKey: stepperKey, goToStep: goToStep });
    },
    onGoToStep(callback) {
      console.log(callback);
      this.$on("goToStep", callback);
    },
    offGoToStep(callback = null) {
      this.$off("goToStep", callback);
    },
  },
});
