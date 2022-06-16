<template>
  <div>
    <b-button
      class="mr-7"
      :variant="buttonVariant"
      @click.prevent="emitInput()"
      >{{ page }} {{ isEnable }}</b-button
    >
  </div>
</template>

<script>
export default {
  inject: ["currentPage"],
  props: {
    page: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  computed: {
    isCurrentPage() {
      return this.page == this.currentPage();
    },
    buttonVariant() {
      return this.isCurrentPage ? "primary" : "light";
    },
  },
  methods: {
    emitInput() {
      this.$emit("input", this.page);
    },
  },
};
</script>

<style>
</style>