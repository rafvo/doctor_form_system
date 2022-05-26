<template>
  <div>
    <InlineRow>
      <label v-if="withLabel" :class="{ required: required }" class="mr-5">{{
        label
      }}</label>
    </InlineRow>

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
        v-slot="{ errors }"
        :name="label"
        :rules="requiredRule"
      >
        <SelectSearchField
          :ref="uniqueSelectKey"
          v-model="Field"
          :bind-value="bindValue"
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
import InlineRow from "@/components/rows/InlineRow.vue";
import SpinnerLoader from "@/components/loaders/SpinnerLoader.vue";
import VeeValidateErrorMessage from "@/components/veeValidate/VeeValidateErrorMessage";
import SelectSearchField from "./SelectSearchField.vue";

export default {
  components: {
    InlineRow,
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
      default: "Digite aqui para realizar a busca",
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
      set(v) {
        this.field = v;

        this.emitInput();
        this.emitSelected();
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
    reset() {
      this.$refs[this.uniqueSelectKey].reset();
    },
    setDefaultValue() {
      this.field = this.defaultValue;
      this.selected = this.selectedOption();
    },
    selectedOption() {
      return this.options
        .filter((f) => f[this.uniqueOptionKey] == this.field)
        .shift();
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
  created() {
    this.setDefaultValue();
  },
};
</script>

<style scoped>
</style>