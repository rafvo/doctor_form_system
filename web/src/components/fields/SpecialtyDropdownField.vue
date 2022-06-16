<template>
  <div>
    <DropdownField
      :class="{ 'inline-block': inline }"
      :bind-value="specialtyId"
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
      @object="setSpecialty"
    />
  </div>
</template>

<script>
import { exist } from "@/util/exist";
import DropdownField from "./DropdownField.vue";
import Especialidades from "@/domain/models/especialidades";

export default {
  components: {
    DropdownField,
  },
  props: {
    specialtyId: {
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
      default: "Especialidade",
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
  },
  data() {
    return {
      loading: false,
      id: null,
      specialty: new Especialidades(),
    };
  },
  computed: {
    /*specialty id*/
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
    Specialty: {
      get() {
        return this.specialty;
      },
      set(payload) {
        if (!payload) payload = new Especialidades();
        this.specialty = payload;

        this.emitSpecialty();
      },
    },
    existSpecialties() {
      return exist(this.specialties);
    },
    specialties() {
      return Object.values(this.$store.state.especialidades.all);
    },
    Options() {
      return this.existSpecialties
        ? [...this.options, ...this.specialties]
        : this.options;
    },
  },
  methods: {
    getAll() {
      this.loading = true;

      // this.$store
      //   .dispatch("especialidades/getAll")
      //   .then((response) => {
      //     console.log(response);
      //     this.loading = false;
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     this.loading = false;
      //   });

      setTimeout(() => {
        this.$store.dispatch("especialidades/all", Especialidades.getAll());
        this.loading = false;
      }, 100);
    },
    setId(payload) {
      this.Id = payload;
    },
    setSpecialty(payload) {
      this.Specialty = payload;
    },
    emitInput() {
      this.$emit("input", this.id);
    },
    emitSpecialty() {
      this.$emit("specialty", this.specialty);
    },
  },
  mounted() {
    if (!this.existSpecialties) this.getAll();
  },
};
</script>

<style>
</style>