<template>
  <div>
    <slot :currentStep="vModel" :teste="`Testando passagem de dados`"></slot>
  </div>
</template>

<script>
export default {
  props: {
    vModel: {
      type: Number,
      default: 1,
      required: false,
    },
  },
};
</script>

<style>
</style>