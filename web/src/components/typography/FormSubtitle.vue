<template>
  <div>
    <h6>{{ title }}</h6>
  </div>
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