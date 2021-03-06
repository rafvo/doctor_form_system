<template>
  <div class="text-field">
   
    <!-- <label
      v-if="withLabel"
      :class="{ required: requiredLabel }"
      :for="uniqueRef"
      >{{ label }}</label
    > -->
    <ValidationProvider
      v-slot="{ errors, valid }"
      :name="label"
      :rules="allRules"
    >

      <FieldLabel v-if="withLabel" :label="label" :required="requiredLabel" />  
      <b-button-toolbar v-if="prefixInToolbar">
        <b-button-group class="mr-1"></b-button-group>
        <b-input-group :prepend="prefix">
          <money
            class="form-control"
            :class="{
              'is-invalid': !isValid({ isValid: valid, errors: errors }),
            }"
            v-model="Field"
            v-bind="money"
            :ref="uniqueRef"
            :id="uniqueKey"
            :name="uniqueNameKey"
            :autofocus="focus"
            @blur="emitBlur"
          ></money>
        </b-input-group>
      </b-button-toolbar>
      <money
        v-else
        class="form-control"
        :class="{ 'is-invalid': !isValid({ isValid: valid, errors: errors }) }"
        v-model="Field"
        v-bind="money"
        :ref="uniqueRef"
        :id="uniqueKey"
        :name="uniqueNameKey"
        :autofocus="focus"
        @blur="emitBlur"
      ></money>
      <VeeValidateErrorMessage :vv-errors="errors" />
    </ValidationProvider>
  </div>
</template>

<script>
import { exist } from "@/util/exist";
import FieldLabel from "@/components/label/FieldLabel.vue";
import VeeValidateErrorMessage from "@/components/veeValidate/VeeValidateErrorMessage";

export default {
  components: {
    FieldLabel,
    VeeValidateErrorMessage,
  },
  props: {
    bindValue: {
      required: false,
    },
    id: {
      type: String,
      default: null,
      required: false,
    },
    inlineLabel: {
      type: Boolean,
      default: false,
      required: false,
    },
    name: {
      type: String,
      default: null,
      required: false,
    },
    label: {
      type: String,
      default: "{Campo}",
      required: false,
    },
    placeholder: {
      type: String,
      default: "",
      required: false,
    },
    requiredLabel: {
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
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
    focus: {
      type: Boolean,
      default: false,
      required: false,
    },
    reset: {
      type: Boolean,
      default: false,
      required: false,
    },
    decimal: {
      type: String,
      default: ",",
      required: false,
    },
    thousands: {
      type: String,
      default: "",
      required: false,
    },
    prefix: {
      type: String,
      default: "R$ ",
      required: false,
    },
    prefixInToolbar: {
      type: Boolean,
      default: false,
      required: false,
    },
    suffix: {
      type: String,
      default: "",
      required: false,
    },
    precision: {
      type: [Number, String],
      default: 2,
      required: false,
    },
    masked: {
      type: [Number, Boolean],
      default: false,
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
      field: 0,
    };
  },
  watch: {
    reset(payload) {
      if (payload) this.Field = null;
    },
    fieldReadonly(payload) {
      if (!payload) return;

      this.field = this.bindValue;
    },
    textReadonly(payload) {
      if (!payload) return;

      this.field = this.bindValue;
    },
  },
  computed: {
    Field: {
      get() {
        return this.field;
      },
      set(v) {
        this.field = v;
        this.emitInput();
      },
    },
    /*reference*/
    uniqueKey() {
      return this.id ? `${this.id}` : `${this._uid}`;
    },
    uniqueNameKey() {
      return this.name ? `${this.name}` : `${this._uid}`;
    },
    uniqueRef() {
      return this.uniqueKey.concat("_ref");
    },
    /*validation rules*/
    defaultRules() {
      return "";
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
    /*bind*/
    money() {
      return {
        decimal: this.decimal,
        thousands: this.thousands,
        prefix: !this.prefixInToolbar ? this.prefix : "",
        suffix: this.suffix,
        precision: this.precision,
        masked: this.masked,
      };
    },
  },
  methods: {
    isValid({ isValid = false, errors = [] } = {}) {
      if (!exist(errors)) return true;

      return isValid;
    },
    emitBlur() {
      this.$emit("blur", true);
    },
    emitInput() {
      this.$emit("input", this.field);
    },
  },
  created() {
    this.field = this.bindValue ? this.bindValue : 0;
  },
};
</script>

<style scoped>
</style>