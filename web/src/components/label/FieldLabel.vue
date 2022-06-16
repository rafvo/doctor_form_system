<template>
  <InlineRow>
    <label :class="{ required: required }" class="mr-5" :for="forId">{{
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
    forId: {
      type: String,
      default: "",
      required: false,
    }
  },
};
</script>

<style>
</style>