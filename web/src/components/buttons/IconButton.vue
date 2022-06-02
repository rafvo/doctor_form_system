<template>
  <div>
    <b-link
      href="javascript:void(0)"
      @click="(event) => $emit('click', event)"
      @click.prevent="(event) => $emit('click:prevent', event)"
    >
      <b-icon icon="chevron-left"></b-icon>
    </b-link>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
      required: false,
    },
  },
};
</script>

<style>
</style>