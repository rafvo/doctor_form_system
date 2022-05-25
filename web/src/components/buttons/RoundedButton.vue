<template>
  <b-button
    block
    variant="primary"
    @click="(event) => $emit('click', event)"
    @click.prevent="(event) => $emit('click:prevent', event)"
  >
    {{ title.toUpperCase() }}
  </b-button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "{Title}",
      required: true,
    },
  },
};
</script>

<style>
</style>