<template>
  <div>
    <InlineRow>
      <label
        v-if="withFieldLabel"
        :class="{ required: requiredLabel }"
        class="mr-5"
        >{{ fieldLabel }}</label
      >
    </InlineRow>

    <ValidationProvider
      v-slot="{ errors }"
      :name="fieldLabel"
      :rules="allRules"
    >
      <b-form-checkbox
        :ref="uniqueRef"
        v-model="Field"
        :id="uniqueKey"
        :name="uniqueNameKey"
        :value="checkedValue"
        :unchecked-value="uncheckedValue"
      >
        <template v-if="withTrueFalseLabel">
          <label
            :for="uniqueKey"
            class="ml-5"
            :class="{ required: requiredLabel }"
          >
            <span>{{ trueFalseLabel }}</span>
          </label>
        </template>
      </b-form-checkbox>
      <VeeValidateErrorMessage :vv-errors="errors" />
    </ValidationProvider>
  </div>
</template>

<script>
import InlineRow from "@/components/rows/InlineRow.vue";
import VeeValidateErrorMessage from "@/components/veeValidate/VeeValidateErrorMessage";

export default {
  components: {
    InlineRow,
    VeeValidateErrorMessage,
  },
  props: {
    bindValue: {
      default: "",
      required: false,
    },
    checkedValue: {
      type: [Boolean, String, Number],
      default: 1,
      required: false,
    },
    checkedLabel: {
      type: String,
      default: "Sim",
      required: false,
    },
    fieldLabel: {
      type: String,
      default: "{Campo}",
      required: false,
    },
    id: {
      type: String,
      default: null,
      required: false,
    },
    inlineFieldLabel: {
      type: Boolean,
      default: false,
      required: false,
    },
    name: {
      type: String,
      default: null,
      required: false,
    },
    requiredLabel: {
      type: Boolean,
      default: false,
      required: false,
    },
    /*
      exemplo: regra_um|regra_dois 
      Obs 1: separar por pipe
      Obs 2: não adicionar pipe no início ou no final
    */
    rules: {
      type: String,
      default: "",
      required: false,
    },
    reset: {
      type: [Number, Boolean],
      default: false,
      required: false,
    },
    uncheckedValue: {
      type: [Boolean, String, Number],
      default: 0,
      required: false,
    },
    uncheckedLabel: {
      type: String,
      default: "Não",
      required: false,
    },
    withFieldLabel: {
      type: Boolean,
      default: false,
      required: false,
    },
    withTrueFalseLabel: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      field: null,
    };
  },
  watch: {
    reset(payload) {
      if (payload) this.Field = this.uncheckedValue;
    },
  },
  computed: {
    Field: {
      get() {
        return this.field;
      },
      set(v) {
        this.field = v;

        this.field == this.checkedValue
          ? this.emitChecked()
          : this.emitUnchecked();

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
    trueFalseLabel() {
      return this.field ? this.checkedLabel : this.uncheckedLabel;
    },
    /*validation rules*/
    defaultRules() {
      return "";
    },
    propRules() {
      return this.rules ? this.rules : "";
    },
    listRules() {
      return [this.defaultRules, this.rules];
    },
    cleanListRules() {
      const results = this.listRules.filter((element) => {
        return element !== "";
      });

      return results;
    },
    allRules() {
      return this.cleanListRules.join("|");
    },
  },
  methods: {
    emitChecked() {
      this.$emit("checked", this.field);
    },
    emitUnchecked() {
      this.$emit("unchecked", {
        checked: this.checkedValue,
        unckecked: this.uncheckedValue,
      });
    },
    emitInput() {
      this.$emit("input", this.field);
    },
  },
  created() {
    this.field = this.bindValue;
  },
};
</script>

<style scoped>
</style>