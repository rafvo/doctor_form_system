<template>
  <div>
    <RoundedButton
      button-classes="btn-primary-0"
      block
      uppercase-title
      @click="(event) => $emit('click', event)"
      @click:prevent="(event) => $emit('click:prevent', event)"
    >
      {{ title }}
    </RoundedButton>
  </div>
</template>

<script>
import RoundedButton from "./RoundedButton.vue";

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
  },
};
</script>

<style>
</style>