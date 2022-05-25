<template>
  <div class="card-component" :style="componentVars">
    <b-card :title="title" class="mb-2">
      <template v-if="hasHeaderSlot" #header>
        <slot name="header"></slot>
      </template>
      <b-card-text>
        <slot name="cardText"></slot>
      </b-card-text>
      <slot></slot>
      <template v-if="hasFooterSlot" #footer>
        <slot name="footer"></slot>
      </template>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
      required: false,
    },
    justifyContent: {
      type: String,
      default: "",
      required: false,
    },
    alignItems: {
      type: String,
      default: "",
      required: false,
    },
    centered: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  computed: {
    hasHeaderSlot() {
      return !!this.$slots.header;
    },
    hasFooterSlot() {
      return !!this.$slots.footer;
    },
    justifyContentComponent() {
      if (this.centered) return "center";

      return this.justifyContent ? this.justifyContent : "unset";
    },
    alignItemsComponent() {
      if (this.centered) return "center";

      return this.alignItems ? this.alignItems : "unset";
    },
    displayFlexEnable() {
      return this.justifyContent || this.alignItems || this.centered;
    },
    displayComponent() {
      return this.displayFlexEnable ? "flex" : "block";
    },
    topComponent() {
      return this.centered ? "50%" : "unset";
    },
    heightComponent() {
      return this.centered ? "100vh" : "100%";
    },
    componentVars() {
      return {
        "--card-component-justify-content": this.justifyContentComponent,
        "--card-component-align-items": this.alignItemsComponent,
        "--card-component-display": this.displayComponent,
        "--card-component-top": this.topComponent,
        "--card-component-height": this.heightComponent,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.card-component {
  display: var(--card-component-display) !important;
  justify-content: var(--card-component-justify-content) !important;
  align-items: var(--card-component-align-items) !important;
  top: var(--card-component-top) !important;
  height: var(--card-component-height) !important;
}
</style>