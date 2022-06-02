<template>
  <span v-if="specialtyName">{{ specialtyName }}</span>
</template>

<script>
export default {
  props: {
    specialtyId: {
      type: [String, Number],
      default: null,
      required: false,
    },
  },
  computed: {
    specialtyById() {
      return this.specialtyId
        ? this.$store.state.especialidades.all[this.specialtyId]
        : null;
    },
    specialtyName() {
      return this.specialtyById ? this.specialtyById.nome : null;
    },
  },
};
</script>

<style>
</style>