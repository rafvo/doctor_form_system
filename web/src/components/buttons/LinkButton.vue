<template>
  <div>
    <b-link
      class="text-decoration-none"
      href="javascript:void(0)"
      :disabled="disabled"
      @click="(event) => $emit('click', event)"
      @click.prevent="(event) => $emit('click:prevent', event)"
    >
      <span :class="{ 'text-uppercase': uppercaseTitle }">
        <slot>{{ title }}</slot>
      </span>
    </b-link>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "{Title}",
      required: false,
    },
    uppercaseTitle: {
      type: Boolean,
      default: false,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
};
</script>

<style>
</style>