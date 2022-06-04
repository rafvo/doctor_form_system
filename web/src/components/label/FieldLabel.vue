<template>
  <InlineRow>
    <label v-if="show" :class="{ required: required }" class="mr-5">{{
      label
    }}</label>
  </InlineRow>
</template>

<script>
import InlineRow from "@/components/rows/InlineRow.vue";

export default {
  components: {
    InlineRow,
  },
  props: {
    label: {
      type: String,
      default: "{Campo}",
      required: false,
    },
    required: {
      type: Boolean,
      default: false,
      required: false,
    },
    show: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
};
</script>

<style>
</style>