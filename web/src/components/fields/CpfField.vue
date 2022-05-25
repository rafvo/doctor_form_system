<template>
  <div class="cpf-field">
    <TextField
      :v-model="Field"
      :autofocus="autofocus"
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
    vModel: {
      type: [String, Number],
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

        this.emitInput();
      },
    },
  },
  watch: {
    vModel() {
      this.field = this.setField();
    },
  },
  methods: {
    setField() {
      const value = _cloneDeep(this.vModel);
      return Vue.filter("cpfcnpj")(value);
    },
    emitInput() {
      this.$emit("input", this.field);
    },
  },
  mounted() {
    this.field = this.setField();
  },
};
</script>

<style>
</style>