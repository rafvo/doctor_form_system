<template>
  <IconButton
    class="stepper-button"
    icon="chevron-left"
    @click:prevent="onClickPrevent"
  />
</template>

<script>
import StepperNavigation from "@/mixins/StepperNavigation";
import IconButton from "@/components/buttons/IconButton.vue";

export default {
  mixins: [StepperNavigation],
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
      if (this.emitRootEvent) this.stepperPrevious();
    },
  },
};
</script>

<style>
</style>