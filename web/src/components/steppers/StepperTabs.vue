<template>
  <Card
    :style="{
      visibility: withCard ? 'visible' : 'hidden',
    }"
  >
    <b-tabs :class="tabClasses" content-class="stepper-tabs mt-3" justified>
      <slot></slot>
    </b-tabs>
  </Card>
</template>

<script>
import Card from "@/components/cards/Card.vue";

export default {
  components: {
    Card,
  },
  props: {
    withCard: {
      type: Boolean,
      default: false,
      required: false,
    },
    tabClasses: {
      type: String,
      default: "",
      required: false,
    },
    withValidIcon: {
      type: Boolean,
      default: false,
      required: false,
    },
    withInvalidIcon: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  provide() {
    return {
      withValidIcon: () => this.withValidIcon,
      withInvalidIcon: () => this.withInvalidIcon
    };
  },
};
</script>

<style>
.card .card-body > .tabs {
  visibility: visible !important;
}
</style>