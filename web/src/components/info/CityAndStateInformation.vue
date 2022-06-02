<template>
  <span v-if="showCityState">{{ cityStateName }}</span>
</template>

<script>
export default {
  props: {
    cityId: {
      type: [String, Number],
      default: null,
      required: false,
    },
  },
  computed: {
    cityById() {
      return this.cityId ? this.$store.state.cidades.all[this.cityId] : null;
    },
    cityName() {
      return this.cityById ? this.cityById.nome : null;
    },
    stateId() {
      return this.cityById ? this.cityById.estadoId : null;
    },
    stateById() {
      return this.stateId ? this.$store.state.estados.all[this.stateId] : null;
    },
    stateName() {
      return this.stateById ? this.stateById.nome : null;
    },
    cityState() {
      return [this.stateName, this.cityName];
    },
    cleanCityState() {
      const results = this.cityState.filter((element) => {
        return element !== "";
      });

      return results;
    },
    showCityState(){
      return this.cityName || this.stateName;
    },
    cityStateName() {
      return this.cleanCityState.join(" - ");
    },
  },
};
</script>

<style>
</style>