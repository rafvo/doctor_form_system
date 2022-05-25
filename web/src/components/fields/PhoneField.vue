<template>
  <div class="phone-field">
    <TextField
      v-model="Field"
      :autofocus="autofocus"
      :default-ref="defaultRef"
      :id="id"
      :label="label"
      :mask="dynamicMask"
      :name="name"
      :placeholder="dynamicPlaceholder"
      :rules="allRules"
      :required-label="requiredLabel"
      :reset="reset"
      :type="type"
      :vid="vid"
    />
  </div>
</template>

<script>
import Vue from "vue";
import _cloneDeep from "lodash/cloneDeep";
import TextField from "./TextField.vue";

export default {
  components: {
    TextField,
  },
  props: {
    autofocus: {
      type: Boolean,
      default: false,
      required: false,
    },
    defaultRef: {
      type: String,
      default: null,
      required: false,
    },
    id: {
      type: String,
      default: null,
      required: false,
    },
    label: {
      type: String,
      default: "{ Campo }",
      required: false,
    },
    name: {
      type: String,
      default: null,
      required: false,
    },
    /*emite o resultado sem máscara*/
    noMaskResult: {
      type: Boolean,
      default: false,
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
    reset: {
      type: Boolean,
      default: false,
      required: false,
    },
    type: {
      type: String,
      default: "text",
      required: false,
    },
    vid: {
      type: String,
      default: null,
      required: false,
    },
    vModel: {
      type: [String, Number],
      default: null,
      required: false,
    },
    /*considera o DDD também*/
    withDDI: {
      type: Boolean,
      default: false,
      required: false,
    },
    withDDD: {
      type: Boolean,
      default: false,
      required: false,
    },
    /*considera apenas a máscara comum de telefone/celular*/
    withMask: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      field: null,
      unmaskField: null,
      dynamicMask: "",
    };
  },
  computed: {
    Field: {
      get() {
        return this.field;
      },
      set(payload) {
        this.field = payload;
        this.dynamicMask = this.setDynamicMask();

        this.setEmitInput();
      },
    },
    /*mask*/
    phoneWithDDIMask() {
      return "+## (##) ####-####";
    },
    phoneWithDDDMask() {
      return "(##) ####-####";
    },
    phoneWithMask() {
      return "####-####";
    },
    cleanPhoneWithDDIMask() {
      return this.cleanMask(this.phoneWithDDIMask);
    },
    cleanPhoneWithDDDMask() {
      return this.cleanMask(this.phoneWithDDDMask);
    },
    cleanPhoneWithMask() {
      return this.cleanMask(this.phoneWithMask);
    },
    cleanPhoneWithDDIMaskLength() {
      return this.cleanPhoneWithDDIMask.length;
    },
    cleanPhoneWithDDDMaskLength() {
      return this.cleanPhoneWithDDDMask.length;
    },
    cleanPhoneWithMaskLength() {
      return this.cleanPhoneWithMask.length;
    },
    phoneMask() {
      if (this.withDDI) return this.phoneWithDDIMask;
      if (this.withDDD) return this.phoneWithDDDMask;
      if (this.withMask) return this.phoneWithMask;

      return "";
    },
    celphoneWithDDIMask() {
      return "+## (##) #####-####";
    },
    celphoneWithDDDMask() {
      return "(##) #####-####";
    },
    celphoneWithMask() {
      return "#####-####";
    },
    cleanCelphoneWithDDIMask() {
      return this.cleanMask(this.celphoneWithDDIMask);
    },
    cleanCelphoneWithDDDMask() {
      return this.cleanMask(this.celphoneWithDDDMask);
    },
    cleanCelphoneWithMask() {
      return this.cleanMask(this.celphoneWithMask);
    },
    cleanCelphoneWithDDIMaskLength() {
      return this.cleanCelphoneWithDDIMask.length;
    },
    cleanCelphoneWithDDDMaskLength() {
      return this.cleanCelphoneWithDDDMask.length;
    },
    cleanCelphoneWithMaskLength() {
      return this.cleanCelphoneWithMask.length;
    },
    celphoneMask() {
      if (this.withDDI) return this.celphoneWithDDIMask;
      if (this.withDDD) return this.celphoneWithDDDMask;
      if (this.withMask) return this.celphoneWithMask;

      return "";
    },
    phoneMaskLength() {
      return this.phoneMask.length;
    },
    celphoneMaskLength() {
      return this.celphoneMask.length;
    },
    cleanPhoneMask() {
      return this.cleanMask(this.phoneMask);
    },
    cleanCelphoneMask() {
      return this.cleanMask(this.celphoneMask);
    },
    cleanPhoneMaskLength() {
      return this.cleanPhoneMask.length;
    },
    cleanCelphoneMaskLength() {
      return this.cleanCelphoneMask.length;
    },
    useMask() {
      return Boolean(this.withDDI || this.withDDD || this.withMask);
    },
    usePhoneMask() {
      return Boolean(this.cleanFieldLength <= this.cleanPhoneMaskLength);
    },
    useCelPhoneMask() {
      return Boolean(this.cleanFieldLength <= this.cleanCelphoneMaskLength);
    },
    /*field*/
    cleanField() {
      if (!this.field) return "";

      const item = this.field;
      return item.replace(/[^0-9]/g, "");
    },
    cleanFieldLength() {
      const item = this.cleanField;
      return item ? item.length : 0;
    },
    /*placeholder*/
    dynamicPlaceholder() {
      if (this.withDDI) return "+00 (00) X0000-0000";
      if (this.withDDD) return "(00) X0000-0000";
      if (this.withMask) return "X0000-0000";

      return "Digite o Telefone";
    },
    /*rules*/
    minMaxRule() {
      return `min:${this.minLength}|max:${this.maxLength}`;
    },
    minLength() {
      if (!this.useMask) return this.cleanPhoneWithDDDMaskLength;

      return this.phoneMaskLength < this.celphoneMaskLength
        ? this.phoneMaskLength
        : this.celphoneMaskLength;
    },
    maxLength() {
      if (!this.useMask) return this.cleanCelphoneWithDDIMaskLength;

      return this.phoneMaskLength > this.celphoneMaskLength
        ? this.phoneMaskLength
        : this.celphoneMaskLength;
    },
    allRules() {
      return `${this.minMaxRule}|${this.rules}`;
    },
  },
  watch: {
    vModel() {
      this.field = _cloneDeep(this.vModel);
    },
  },
  methods: {
    cleanMask(mask, { maskKey = "#" } = {}) {
      const splitedMask = _cloneDeep(mask.split(""));
      return splitedMask.filter((e) => e == maskKey).join("");
    },
    setField() {
      const value = _cloneDeep(this.vModel);

      if (this.withDDI) return Vue.filter("phoneCelphoneWithDDI")(value);
      if (this.withDDD) return Vue.filter("phoneCelphoneWithDDD")(value);
      if (this.withMask) return Vue.filter("phoneCelphone")(value);

      return value;
    },
    setDynamicMask() {
      if (!this.useMask) return "";
      if (!this.field) return this.dynamicMask;
      if (this.usePhoneMask) return this.phoneMask;
      if (this.useCelPhoneMask) return this.celphoneMask;

      return this.dynamicMask;
    },
    setEmitInput() {
      if (this.noMaskResult) {
        this.emitInput(this.cleanField); /*emitir sem máscara*/
      } else {
        this.emitInput(this.field); /*emitir com máscara*/
      }
    },
    emitInput(payload) {
      this.$emit("input", payload);
    },
  },
  created() {
    this.field = this.setField();
    this.dynamicMask = this.setDynamicMask();
  },
};
</script>

<style>
</style>