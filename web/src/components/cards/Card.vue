<template>
  <div class="card-component">
    <b-card
      :title="title"
      class="mb-2"
      :style="{
        width: width,
        'border-radius': borderRadius,
      }"
    >
      <template v-if="hasHeaderSlot" #header>
        <slot name="header"></slot>
      </template>
      <SpinnerLoader
        v-if="loading"
        width="3rem"
        height="3rem"
        justify-content="center"
      />
      <template v-else>
        <b-card-text>
          <slot name="cardText"></slot>
        </b-card-text>
        <slot></slot>
      </template>
    </b-card>
  </div>
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
      default: "",
      required: false,
    },
    width: {
      type: String,
      default: "100%",
      required: false,
    },
    borderRadius: {
      type: String,
      default: "25px",
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  computed: {
    hasHeaderSlot() {
      return !!this.$slots.header;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variables/constants';

@media (max-width: $mobile_max_width) {
  .card-component .card {
    padding-right: 0 !important;
    padding-left: 0 !important;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    height: 100vh!important;
  }
}
</style>