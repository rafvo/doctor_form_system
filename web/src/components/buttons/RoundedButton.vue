<template>
  <b-button
    :class="[buttonClasses, { block: block }]"
    :style="buttonVars"
    @click="(event) => $emit('click', event)"
    @click.prevent="(event) => $emit('click:prevent', event)"
  >
    <SpinnerLoader
      v-if="loading"
      :variant="spinnerVariant"
      width="1.5rem"
      height="1.5rem"
      justify-content="center"
      small
    />
    <template v-else>
      <span :class="{ 'text-uppercase': uppercaseTitle }">
        <slot>{{ title }}</slot>
      </span>
    </template>
  </b-button>
</template>

<script>
import SpinnerLoader from "@/components/loaders/SpinnerLoader.vue";

export default {
  components: {
    SpinnerLoader,
  },
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
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
    spinnerVariant: {
      type: String,
      default: "primary",
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