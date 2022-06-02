<template>
  <IconButton icon="chevron-left" @click:prevent="onClickPrevent" />
</template>

<script>
import IconButton from "@/components/buttons/IconButton.vue";

export default {
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
      this.$store.dispatch("stepper/emiPreviousButtonClick");
    },
  },
};
</script>

<style>
</style>