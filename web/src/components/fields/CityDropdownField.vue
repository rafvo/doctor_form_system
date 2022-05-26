<template>
  <div>
    <b-row>
      <b-col md="4">
        <template v-if="withStateField">
          <slot name="stateField" :state="state">
            <StateDropdownField
              :ref="uniqueStateKey"
              v-model="state.id"
              :state-id="state.id"
              :city-id="cityId"
              :live-search="liveSearch"
              :search-placeholder="searchPlaceholder"
              :required="required"
              :with-label="withLabel"
              @input="resetCity"
              @state="getByStateId"
            />
          </slot>
        </template>
      </b-col>
      <b-col md="8">
        <DropdownField
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
          @input="setCityId"
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
      default: "Digite aqui para realizar a busca",
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
    uniqueCityKey() {
      return this.id ? `${this.id}` : `${this._uid}_city`;
    },
    uniqueCityNameKey() {
      return this.name ? `${this.name}` : `${this._uid}_city`;
    },
    uniqueStateKey() {
      return `${this._uid}_state`;
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
      return new CidadesFiltros({ estadoId: this.state.id });
    },
  },
  watch: {
    fieldReadonly() {
      if (!this.oldCityId && this.fieldReadonly) {
        this.city = new Cidades();
        this.state = new Estados();
      }
    },
    textReadonly() {
      if (!this.oldCityId && this.textReadonly) {
        this.city = new Cidades();
        this.state = new Estados();
      }
    },
    cityId() {
      const model = this.$store.state.cidades.all[this.cityId];
      if (!model) this.getByCityState();
    },
  },
  methods: {
    resetCity() {
      this.$refs[this.uniqueCityKey].reset();
    },
    isLoadedCities() {
      let isLoaded = false;

      for (const model of Object.values(this.$store.state.cidades.all)) {
        if (model.estadoId == this.state.id) {
          isLoaded = true;
          break;
        }
      }

      return isLoaded;
    },
    getByStateId() {
      if (this.isLoadedCities()) return;

      this.loading = true;
      setTimeout(() => {
        this.$store.dispatch(
          "cidades/all",
          Cidades.getByStateId(this.state.id)
        );
        this.loading = false;
      }, 2000);

      // this.$store
      //   .dispatch("cidades/getAll", { cityFilter: this.cityFilter)
      //   .then((response) => {
      //     console.log(response);
      //     this.loading = false;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     this.loading = false;
      //   });
    },
    setCityId(payload) {
      this.Id = payload;
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
  },
};
</script>

<style>
</style>