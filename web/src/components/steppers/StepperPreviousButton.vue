<template>
  <IconButton
    icon="chevron-left"
    @click="onClick"
    @click:prevent="onClickPrevent"
  />
</template>

<script>
import IconButton from "@/components/buttons/IconButton.vue";

export default {
  components: {
    IconButton,
  },
  methods: {
    onClick(event) {
      this.$emit("click", event);
      if (this.emitRootEvent) this.rootEmit(event);
    },
    onClickPrevent(event) {
      this.$emit("click:prevent", event);
      if (this.emitRootEvent) this.rootEmit(event);
    },
    rootEmit(event) {
      this.$root.$emit("stepperPreviousButton", event);
    },
  },
};
</script>

<style>
</style>