<template>
  <div>
    <DropdownField
      :class="{ 'inline-block': inline }"
      :bind-value="stateId"
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
      @input="setId"
      @object="setState"
    />

    <template v-if="withCityField">
      <slot name="cityField" :city="city">
        <CityDropdownField
          :class="{ 'inline-block': inline }"
          v-model="city.id"
          :state-id="city.id_state"
          :with-label="withLabel"
          :required="required"
        />
      </slot>
    </template>
  </div>
</template>

<script>
import { exist } from "@/util/exist"
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
      default: "Digite aqui para realizar a busca",
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
      id: null,
      state: new Estados(),
      city: new Cidades(),
    };
  },
  computed: {
    /*city id*/
    Id: {
      get() {
        return this.id;
      },
      set(payload) {
        if (!payload) payload = null;
        this.id = payload;

        this.emitInput();
      },
    },
    /*state model*/
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
      return this.existCityId ? this.$store.state.cidades.all[this.cityId] : null;
    },
    Options() {
      return this.existStates
        ? [...this.options, ...this.states]
        : this.options;
    },
  },
  watch: {
    stateId(payload) {
      if (!payload) {
        this.Id = null;
        this.State = null;
      }
    },
    cityById(payload) {
      if (payload) this.Id = payload.id_state;
    },
  },
  methods: {
    getAll() {
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
    setId(payload) {
      this.Id = payload;
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
  },
};
</script>

<style>
</style>