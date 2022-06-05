<template>
  <div>
    <FieldLabel v-if="withLabel" :label="label" :required="required" />
    <SpinnerLoader
      v-if="loading"
      width="1.5rem"
      height="1.5rem"
      justify-content="left"
      loading-text="Carregando Opções..."
      with-loading-text
      small
    />
    <template v-else>
      <ValidationProvider
        v-slot="{ errors, valid }"
        :name="label"
        :rules="requiredRule"
      >
        <SelectSearchField
          v-model="Field"
          :ref="uniqueSelectKey"
          :bind-value="bindValue"
          :valid-field="isValid({ isValid: valid, errors: errors })"
          :id="uniqueKey"
          :name="uniqueNameKey"
          :options="options"
          :unique-option-key="uniqueOptionKey"
          :label-option-key="labelOptionKey"
          :live-search="liveSearch"
          :search-placeholder="searchPlaceholder"
          :loading="loading"
          @selected="setSelected"
        />
        <VeeValidateErrorMessage :vv-errors="errors" />
      </ValidationProvider>
    </template>
  </div>
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";
import { exist } from "@/util/exist";
import FieldLabel from "@/components/label/FieldLabel.vue";
import SpinnerLoader from "@/components/loaders/SpinnerLoader.vue";
import VeeValidateErrorMessage from "@/components/veeValidate/VeeValidateErrorMessage";
import SelectSearchField from "./SelectSearchField.vue";

export default {
  components: {
    FieldLabel,
    SpinnerLoader,
    VeeValidateErrorMessage,
    SelectSearchField,
  },
  props: {
    options: {
      type: Array,
      default: () => [{ id: null, label: "Selecione" }],
      required: false,
    },
    bindValue: {
      type: [String, Number],
      default: null,
      required: false,
    },
    uniqueOptionKey: {
      type: String,
      default: "id",
      required: false,
    },
    labelOptionKey: {
      type: String,
      default: "label",
      required: false,
    },
    inlineLabel: {
      type: Boolean,
      default: false,
      required: false,
    },
    id: {
      type: String,
      default: null,
      required: false,
    },
    name: {
      type: String,
      default: null,
      required: false,
    },
    showLabel: {
      type: Boolean,
      default: false,
      required: false,
    },
    label: {
      type: String,
      default: "{Campo}",
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
    loading: {
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
      field: null,
      selected: {},
    };
  },
  computed: {
    Field: {
      get() {
        return this.field;
      },
      set(payload) {
        this.field = payload;
        this.emitInput();
      },
    },
    uniqueKey() {
      return this.id ? `${this.id}` : `${this._uid}`;
    },
    uniqueNameKey() {
      return this.name ? `${this.name}` : `${this._uid}`;
    },
    uniqueRef() {
      return this.uniqueKey.concat("_ref");
    },
    uniqueSelectKey() {
      return `${this._uid}_select`;
    },
    existSelected() {
      return Boolean(this.selected);
    },
    textFieldValue() {
      if (!this.existSelected) return null;
      return this.selected[this.labelOptionKey];
    },
    requiredRule() {
      return this.required ? "required" : "";
    },
  },
  methods: {
    isValid({ isValid = false, errors = [] } = {}) {
      if (!exist(errors)) return true;

      return isValid;
    },
    reset() {
      this.$refs[this.uniqueSelectKey].reset();
    },
    setSelected(payload) {
      this.selected = payload;
      this.emitSelected();
    },
    emitInput() {
      this.$emit("input", this.field);
    },
    emitSelected() {
      this.$emit("object", this.selected);
    },
  },
  mounted() {
    this.field = _cloneDeep(this.bindValue);
  },
};
</script>

<style scoped>
</style>