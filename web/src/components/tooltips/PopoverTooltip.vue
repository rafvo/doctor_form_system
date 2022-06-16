<template>
  <div :class="{ 'inline-block': inlineTooltip }">
    <IconButton :id="componentKey" icon="question-circle" animation="fade" />
    <b-popover :target="componentKey" triggers="hover" placement="top">
      <b-row>
        <b-col>
          <Card class="cursor-pointer">
            <slot></slot>
          </Card>
        </b-col>
      </b-row>
    </b-popover>
  </div>
</template>

<script>
import Card from "@/components/cards/Card.vue";
import IconButton from "@/components/buttons/IconButton.vue";

export default {
  components: {
    Card,
    IconButton,
  },
  props: {
    inlineTooltip: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    componentKey() {
      return `${this._uid}_popover_tooltip`;
    },
  },
};
</script>

<style scoped>
</style>