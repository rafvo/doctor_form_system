<template>
  <div>
    <LinkButton
      class="link-btn"
      :class="{ 'text-center': centered}"
      @click="(event) => $emit('click', event)"
      @click:prevent="(event) => $emit('click:prevent', event)"
    >
      {{ title }}
    </LinkButton>
  </div>
</template>

<script>
import LinkButton from "./LinkButton.vue";

export default {
  components: {
    LinkButton,
  },
  props: {
    title: {
      type: String,
      default: "Editar Cadastro",
      required: false,
    },
    centered: {
      type: Boolean,
      default: false,
      required: false
    }
  },
};
</script>

<style>
</style>