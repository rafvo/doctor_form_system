<template>
  <div>
    <RoundedButton
      button-classes="btn-primary-0"
      block
      uppercase-title
      @click:prevent="onClickPrevent"
    >
      <slot>
        {{ title }}
      </slot>
    </RoundedButton>
  </div>
</template>

<script>
import RoundedButton from "@/components/buttons/RoundedButton.vue";

export default {
  components: {
    RoundedButton,
  },
  props: {
    title: {
      type: String,
      default: "Próximo",
      required: false,
    },
    emitRootEvent: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  methods: {
    onClickPrevent(event) {
      this.$emit("click:prevent", event);
      if (this.emitRootEvent) this.rootEmit(event);
    },
    rootEmit(event) {
      this.$root.$emit("stepperNextButton", event);
    },
  },
};
</script>

<style>
</style>