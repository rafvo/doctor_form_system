<template>
  <b-button
    :class="[buttonClasses, { block: block }]"
    :style="buttonVars"
    @click="(event) => $emit('click', event)"
    @click.prevent="(event) => $emit('click:prevent', event)"
  >
    <span :class="{ 'text-uppercase': uppercaseTitle }">
      <slot>{{ title }}</slot>
    </span>
  </b-button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "{Title}",
      required: false,
    },
    buttonClasses: {
      type: String,
      default: "",
      required: false,
    },
    borderRadius: {
      type: String,
      default: "15px",
      required: false,
    },
    block: {
      type: Boolean,
      default: false,
      required: false,
    },
    uppercaseTitle: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  computed: {
    buttonVars() {
      return {
        "--rounded-buttton-border-radius": this.borderRadius,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  border-radius: var(--rounded-buttton-border-radius) !important;
}

.block {
  display: block !important;
  width: 100% !important;
}
</style>