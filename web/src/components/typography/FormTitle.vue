<template>
  <b-row class="title">
    <b-col cols="12">
      <h6 class="form-title">{{ title }}</h6>
    </b-col>
  </b-row>
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

<style scoped>
</style>