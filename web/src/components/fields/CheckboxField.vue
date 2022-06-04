<template>
  <div>
    <FieldLabel v-if="withFieldLabel" :label="fieldLabel" :required="requiredLabel" />
    <ValidationProvider
      v-slot="{ errors }"
      :name="fieldLabel"
      :rules="rules"
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
import FieldLabel from "@/components/label/FieldLabel.vue";
import VeeValidateErrorMessage from "@/components/veeValidate/VeeValidateErrorMessage";

export default {
  components: {
    FieldLabel,
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
    inlineFieldLabel: {
      type: Boolean,
      default: false,
      required: false,
    },
    requiredLabel: {
      type: Boolean,
      default: false,
      required: false,
    },
    rules: {
      type: String,
      default: "",
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
  mounted() {
    this.field = this.bindValue;
  },
};
</script>

<style scoped>
</style>