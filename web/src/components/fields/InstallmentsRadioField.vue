<template>
  <div>
    <RadioField
      :bindValue="bindValue"
      :options="installments"
      uniqueOptionKey="id"
      labelOptionKey="label"
      :id="id"
      :name="name"
      :fieldLabel="fieldLabel"
      :rules="rules"
      :requiredLabel="requiredLabel"
      :inlineLabel="inlineLabel"
      :inlineOptions="inlineOptions"
      :withFieldLabel="withFieldLabel"
      @input="emitInput"
      @object="emitObject"
    />
  </div>
</template>

<script>
import RadioField from "./RadioField.vue";

export default {
  components: {
    RadioField,
  },
  props: {
    total: {
      type: [String, Number],
      default: 1,
      required: false,
    },
    /*com juros*/
    withInterest: {
      type: Boolean,
      default: false,
      required: false,
    },
    bindValue: {
      type: [String, Number],
      default: "",
      required: false,
    },
    uniqueOptionKey: {
      type: String,
      default: "value",
      required: false,
    },
    labelOptionKey: {
      type: String,
      default: "text",
      required: false,
    },
    id: {
      type: [Number, String],
      default: null,
      required: false,
    },
    name: {
      type: [Number, String],
      default: null,
      required: false,
    },
    fieldLabel: {
      type: String,
      default: "Parcelamento em",
      required: false,
    },
    rules: {
      type: String,
      default: "",
      required: false,
    },
    requiredLabel: {
      type: Boolean,
      default: false,
      required: false,
    },
    inlineLabel: {
      type: Boolean,
      default: false,
      required: false,
    },
    inlineOptions: {
      type: Boolean,
      default: false,
      required: false,
    },
    withFieldLabel: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  computed: {
    installmentsList() {
      const list = [];
      for (let index = 1; index <= this.total; index++) {
        list.push(index);
      }
      return list;
    },
    installments() {
      return this.installmentsList.map((e) => {
        return {
          id: e,
          label: this.label(e),
          withInterest: this.withInterest,
        };
      });
    },
    withInterestLabel() {
      return this.withInterest ? "com juros" : "sem juros";
    },
  },
  methods: {
    label(installmentNumber) {
      return `${installmentNumber}x, ${this.withInterestLabel}`;
    },
    emitObject(payload) {
      this.$emit("object", payload);
    },
    emitInput(payload) {
      this.$emit("input", payload);
    },
  },
};
</script>

<style>
</style>