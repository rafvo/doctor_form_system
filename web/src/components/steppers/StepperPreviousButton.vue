<template>
  <IconButton
    class="stepper-button"
    icon="chevron-left"
    @click:prevent="onClickPrevent"
  />
</template>

<script>
import stepperBus from "@/events/stepper";
import IconButton from "@/components/buttons/IconButton.vue";

export default {
  inject: ["stepperKey"],
  components: {
    IconButton,
  },
  props: {
    emitRootEvent: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  methods: {
    onClickPrevent(event) {
      this.$emit("click:prevent", event);
      this.rootEmit();
    },
    rootEmit() {
      if (!this.emitRootEvent) return;
      stepperBus.emitPreviousClick(this.stepperKey());
    },
  },
};
</script>

<style>
</style>