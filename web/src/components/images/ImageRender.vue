<template>
  <b-img :src="src"></b-img>
</template>

<script>
import ImageLoader from "@/mixins/ImageLoader";

export default {
  mixins: [ImageLoader],
  props: {
    imageLoaderComputedProp: {
      type: String,
      default: "",
      required: false,
    },
  },
  computed: {
    src(){
      return this.imageLoaderComputedProp ? this[this.imageLoaderComputedProp] : ""
    }
  }
};
</script>

<style>
</style>