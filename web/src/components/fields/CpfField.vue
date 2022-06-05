<template>
  <div class="cpf-field">
    <!-- cpf_exist -->
    <TextField
      v-model="Field"
      :autofocus="autofocus"
      :bind-value="bindValue"
      default-rules="cpf"
      :default-ref="defaultRef"
      :id="id"
      :label="label"
      :mask="mask"
      :name="name"
      :placeholder="placeholder"
      :rules="rules"
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
import TextField from "@/components/fields/TextField.vue";

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
    bindValue: {
      type: [String, Number],
      default: null,
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
    mask: {
      type: String,
      default: "###.###.###-##",
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
    placeholder: {
      type: String,
      default: "",
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
      set(payload) {
        this.field = payload;

        this.setEmitInput();
      },
    },
    cleanField() {
      if (!this.field) return "";

      const item = this.field;
      return item.replace(/[^0-9]/g, "");
    },
  },
  methods: {
    setField() {
      const value = _cloneDeep(this.bindValue);
      return Vue.filter("cpfcnpj")(value);
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
  mounted() {
    this.field = this.setField();
  },
};
</script>

<style>
</style>