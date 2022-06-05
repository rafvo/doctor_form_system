<template>
  <div
    class="d-flex text-center"
    :class="justifyContent"
    :style="{
      'justify-content': justify,
    }"
  >
    <InlineRow>
      <b-spinner
        :variant="variant"
        :small="small"
        :style="{
          width: width,
          height: height,
        }"
      ></b-spinner>
      <slot name="complement">
        <label v-if="withLoadingText" class="ml-5">{{ loadingText }}</label>
      </slot>
    </InlineRow>
  </div>
</template>

<script>
import InlineRow from "@/components/rows/InlineRow.vue";

export default {
  components: {
    InlineRow,
  },
  props: {
    variant: {
      type: String,
      default: "primary",
      required: false,
    },
    height: {
      type: String,
      default: "3rem",
      required: false,
    },
    width: {
      type: String,
      default: "3rem",
      required: false,
    },
    justifyContent: {
      type: String,
      default: "center",
      required: false,
    },
    small: {
      type: Boolean,
      default: false,
      required: false,
    },
    loadingText: {
      type: String,
      default: "Carregando...",
      required: false,
    },
    withLoadingText: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  computed: {
    justify() {
      return this.justifyContent ? this.justifyContent : "center";
    },
  },
};
</script>