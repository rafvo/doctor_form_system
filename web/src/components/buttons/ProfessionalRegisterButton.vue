<template>
  <div>
    <RoundedButton
      button-classes="bnt-cta-0"
      :loading="loading"
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
      default: "Cadastrar Profissional",
      required: false,
    },
    loading: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
};
</script>

<style>
</style>