<template>
  <div>
    <b-row>
      <b-col md="6">
        <template v-if="withStateField">
          <slot name="stateField" :state="state">
            <StateDropdownField
              :ref="uniqueStateKey"
              v-model="state.id"
              :city-id="cityId"
              :live-search="liveSearch"
              :search-placeholder="searchPlaceholder"
              :required="required"
              :with-label="withLabel"
              @state="onStateChange"
            />
          </slot>
        </template>
      </b-col>
      <b-col md="6">
        <DropdownField
          v-model="Id"
          :ref="uniqueCityKey"
          :bind-value="cityId"
          :options="Options"
          :unique-option-key="uniqueOptionKey"
          :label-option-key="labelOptionKey"
          :name="name"
          :label="label"
          :live-search="liveSearch"
          :search-placeholder="searchPlaceholder"
          :required="required"
          :loading="loading"
          :with-label="withLabel"
          @object="setCity"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";
import Cidades from "@/domain/models/cidades";
import CidadesFiltros from "@/domain/filters/cidades";
import Estados from "@/domain/models/estados";
import DropdownField from "./DropdownField.vue";
import StateDropdownField from "./StateDropdownField.vue";

export default {
  components: {
    DropdownField,
    StateDropdownField,
  },
  props: {
    cityId: {
      type: [String, Number],
      default: null,
      required: false,
    },
    options: {
      type: Array,
      default: () => [{ id: null, nome: "Selecione" }],
      required: false,
    },
    uniqueOptionKey: {
      type: String,
      default: "id",
      required: false,
    },
    id: {
      type: String,
      default: null,
      required: false,
    },
    labelOptionKey: {
      type: String,
      default: "nome",
      required: false,
    },
    name: {
      type: [String, Number],
      default: null,
      required: false,
    },
    label: {
      type: String,
      default: "Cidade",
      required: false,
    },
    liveSearch: {
      type: Boolean,
      default: false,
      required: false,
    },
    required: {
      type: Boolean,
      default: false,
      required: false,
    },
    textReadonly: {
      type: Boolean,
      default: false,
      required: false,
    },
    fieldReadonly: {
      type: Boolean,
      default: false,
      required: false,
    },
    searchPlaceholder: {
      type: String,
      default: "Buscar",
      required: false,
    },
    inline: {
      type: Boolean,
      default: false,
      required: false,
    },
    withLabel: {
      type: Boolean,
      default: false,
      required: false,
    },
    withStateField: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      loading: false,
      oldCityId: null,
      city: new Cidades(),
      state: new Estados(),
    };
  },
  computed: {
    /*city id*/
    Id: {
      get() {
        return this.city.id;
      },
      set(payload) {
        if (!payload) payload = null;
        this.city.id = payload;

        this.emitInput();
      },
    },
    /*city model*/
    City: {
      get() {
        return this.city;
      },
      set(payload) {
        if (!payload) payload = new Cidades();
        this.city = payload;

        this.emitCity();
      },
    },
    existState() {
      return Boolean(this.state);
    },
    existStateId() {
      return Boolean(this.existState && this.state.id);
    },
    existCities() {
      return Boolean(this.cities);
    },
    existCity() {
      return Boolean(this.city);
    },
    existCityId() {
      return Boolean(this.cityId);
    },
    uniqueKey() {
      return `${this._uid}`;
    },
    uniqueCityKey() {
      return this.id ? `${this.id}` : `${this.uniqueKey}_city`;
    },
    uniqueCityNameKey() {
      return this.name ? `${this.name}` : `${this.uniqueKey}_city`;
    },
    uniqueStateKey() {
      return `${this.uniqueKey}_state`;
    },
    uniqueRef() {
      return this.uniqueKey.concat("_ref");
    },
    cities() {
      if (!this.existStateId) return [];
      const cities = _cloneDeep(Object.values(this.$store.state.cidades.all));
      return cities.filter((f) => f.estadoId == this.state.id);
    },
    loadWithState() {
      return Boolean(this.existCityId && this.withStateField);
    },
    Options() {
      if (!this.existCities) return this.options;
      return [...this.options, ...this.cities];
    },
    cityFilter() {
      return new CidadesFiltros({ estadoId: this.stateIdByCity });
    },
    cityById() {
      return this.existCityId
        ? this.$store.state.cidades.all[this.cityId]
        : null;
    },
    stateIdByCity() {
      return this.cityById ? this.cityById.estadoId : null;
    },
  },
  methods: {
    onStateChange(state) {
      if (!state || !state.id) return;
      if (this.isLoadedCities(state.id)) return;

      //this.resetCity();
      this.getByStateId(state.id);
    },
    resetCity() {
      console.log("reset city");
      this.$refs[this.uniqueCityKey].reset();
    },
    isLoadedCities(stateId) {
      if (!stateId) return false;

      let isLoaded = false;
      for (const model of Object.values(this.$store.state.cidades.all)) {
        if (model.estadoId == stateId) {
          isLoaded = true;
          break;
        }
      }
      return isLoaded;
    },
    getByStateId(stateId) {
      this.loading = true;

      this.$store
        .dispatch("cidades/getAll", {
          cityFilter: new CidadesFiltros({ estadoId: stateId }),
        })
        .then((response) => {
          console.log(response);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });

      //    setTimeout(() => {
      //   this.$store.dispatch("cidades/all", Cidades.getByStateId(stateId));
      //   this.loading = false;
      // }, 2000);
    },
    setCity(payload) {
      this.City = payload;
    },
    emitInput() {
      this.$emit("input", this.city.id);
    },
    emitCity() {
      this.$emit("city", this.city);
    },
  },
  mounted() {
    this.oldCityId = _cloneDeep(this.cityId);
    this.state.id = _cloneDeep(this.stateIdByCity);
  },
};
</script>

<style>
</style>
