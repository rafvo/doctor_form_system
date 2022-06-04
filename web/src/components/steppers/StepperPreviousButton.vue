<template>
  <IconButton icon="chevron-left" @click:prevent="onClickPrevent" />
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
      if (this.emitRootEvent) this.rootEmit();
    },
    rootEmit() {
      stepperBus.emitPreviousClick(this.stepperKey());
    },
  },
};
</script>

<style>
</style>