<template>
  <div>
    <DropdownField
      v-model="Id"
      :class="{ 'inline-block': inline }"
      :bind-value="stateIdByCity"
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
      @object="setState"
    />
    <template v-if="withCityField">
      <slot name="cityField" :city="city">
        <CityDropdownField
          :class="{ 'inline-block': inline }"
          v-model="city.id"
          :with-label="withLabel"
          :required="required"
        />
      </slot>
    </template>
  </div>
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";
import { exist } from "@/util/exist";
import Estados from "@/domain/models/estados";
import Cidades from "@/domain/models/cidades";
import DropdownField from "./DropdownField.vue";
import CityDropdownField from "./CityDropdownField.vue";

export default {
  components: {
    DropdownField,
    CityDropdownField,
  },
  props: {
    cityId: {
      type: [String, Number],
      default: null,
      required: false,
    },
    stateId: {
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
    labelOptionKey: {
      type: String,
      default: "nome",
      required: false,
    },
    stateIdInCityKey: {
      type: String,
      default: "estadoId",
      required: false,
    },
    name: {
      type: [String, Number],
      default: null,
      required: false,
    },
    label: {
      type: String,
      default: "Estado",
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
    inline: {
      type: Boolean,
      default: false,
      required: false,
    },
    searchPlaceholder: {
      type: String,
      default: "Buscar",
      required: false,
    },
    withLabel: {
      type: Boolean,
      default: false,
      required: false,
    },
    withCityField: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      loading: false,
      oldId: null,
      id: null,
      state: new Estados(),
      city: new Cidades(),
    };
  },
  computed: {
    Id: {
      get() {
        return this.id;
      },
      set(payload) {
        this.id = payload;
        this.emitInput();
      },
    },
    State: {
      get() {
        return this.state;
      },
      set(payload) {
        if (!payload) payload = new Estados();
        this.state = payload;

        this.emitState();
      },
    },
    existStates() {
      return exist(this.states);
    },
    existCityId() {
      return exist(this.cityId);
    },
    states() {
      return Object.values(this.$store.state.estados.all);
    },
    cityById() {
      return this.existCityId
        ? this.$store.state.cidades.all[this.cityId]
        : null;
    },
    stateIdByCity() {
      return this.cityById ? this.cityById[this.stateIdInCityKey] : null;
    },
    Options() {
      return this.existStates
        ? [...this.options, ...this.states]
        : this.options;
    },
  },
  methods: {
    getAll() {
      console.log("load states");
      this.loading = true;
      setTimeout(() => {
        this.$store.dispatch("estados/all", Estados.getAll());
        this.loading = false;
      }, 2000);

      // this.$store
      //   .dispatch("states/getAll")
      //   .then((response) => {
      //     console.log(response);
      //     this.loading = false;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     this.loading = false;
      //   });
    },
    setState(payload) {
      this.State = payload;
    },
    emitInput() {
      this.$emit("input", this.id);
    },
    emitState() {
      this.$emit("state", this.state);
    },
  },
  mounted() {
    if (!this.existStates) this.getAll();
    this.oldId = _cloneDeep(this.stateId);
  },
};
</script>

<style>
</style>