<template>
  <div>
    <StepperProgressBar class="mb-3" v-if="withProgress" />
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
import StepperProgressBar from "@/components/steppers/StepperProgressBar.vue";

export default {
  components: {
    RoundedButton,
    StepperProgressBar,
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
    withProgress: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  methods: {
    onClickPrevent(event) {
      this.$emit("click:prevent", event);
      if (this.emitRootEvent) this.rootEmit();
    },
    rootEmit() {
      this.$store.dispatch("stepper/emitNextButtonClick");
    },
  },
};
</script>

<style>
</style>