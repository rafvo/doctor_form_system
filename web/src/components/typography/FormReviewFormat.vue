<template>
  <div>
    <b-row>
      <b-col>
        <label :class="labelClasses">{{ label }}</label>
        <p v-if="(hasSlot && !showEmptyMessage) || description">
          <slot>
            {{ description }}
          </slot>
        </p>
        <p v-else>
          {{ emptyMessage }}
        </p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { exist } from "@/util/exist";

export default {
  props: {
    labelClasses: {
      type: String,
      default: "font-weight-bold",
      required: false,
    },
    label: {
      type: String,
      default: "{Label}",
      required: false,
    },
    showEmptyMessage: {
      type: Boolean,
      default: false,
      required: false,
    },
    emptyMessage: {
      type: String,
      default: "Nenhuma informação",
      required: false,
    },
    description: {
      type: String,
      default: "",
      required: false,
    },
  },
  computed: {
    hasSlot() {
      return exist(this.$slots);
    },
  },
};
</script>

<style>
</style>