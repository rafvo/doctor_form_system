<template>
  <div class="p-0 mt-0">
    <span
      class="mt-0"
      :class="errorClasses"
      v-for="(item, key) in vvErrors"
      :key="key"
    >
      <v-icon v-if="withIcon" :class="iconClasses" class="mr-4">{{
        icon
      }}</v-icon
      >{{ item }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    vvErrors: {
      type: Array,
      default: () => [],
      required: false,
    },
    errorClasses: {
      type: String,
      default: "text-danger",
      required: false,
    },
    icon: {
      type: String,
      default: "",
      required: false,
    },
    iconClasses: {
      type: String,
      default: "",
      required: false,
    },
    withIcon: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
};
</script>

<style>
</style>