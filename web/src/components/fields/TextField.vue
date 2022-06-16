<template>
  <div class="text-field">
    <b-row>
      <b-col>
        <b-form-group>
          <InlineRow>
            <FieldLabel
              :label="label"
              :required="requiredLabel"
              :for-id="uniqueKey"
            />
            <slot name="labelComplement"></slot>
          </InlineRow>

          <ValidationProvider
            :ref="providerRef"
            :vid="providerVid"
            :name="label"
            :rules="allRules"
            v-slot="{ errors, valid }"
          >
            <b-form-input
              v-model="Field"
              :value="bindValue"
              v-mask="mask"
              :ref="fieldRef"
              :id="uniqueKey"
              :name="uniqueNameKey"
              :state="isValid({ isValid: valid, errors: errors })"
              :type="type"
              :placeholder="placeholder"
            ></b-form-input>
            <VeeValidateErrorMessage :vv-errors="errors" />
          </ValidationProvider>
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";
import { exist } from "@/util/exist";
import InlineRow from "@/components/rows/InlineRow.vue";
import FieldLabel from "@/components/label/FieldLabel.vue";
import VeeValidateErrorMessage from "@/components/veeValidate/VeeValidateErrorMessage";

export default {
  components: {
    InlineRow,
    FieldLabel,
    VeeValidateErrorMessage,
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
    defaultRules: {
      type: String,
      default: "",
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
      default: "",
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
    uniqueKey() {
      return this.id ? `${this.id}` : `${this._uid}`;
    },
    uniqueNameKey() {
      return this.name ? `${this.name}` : `${this._uid}`;
    },
    fieldRef() {
      return this.defaultRef
        ? `${this.defaultRef}`
        : this.uniqueKey.concat("_ref");
    },
    providerRef() {
      return this.uniqueKey.concat("_provider_ref");
    },
    providerVid() {
      return this.vid ? `${this.vid}` : this.uniqueKey.concat("_provider_vid");
    },
    /*validation rules*/
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
  watch: {
    reset(payload) {
      if (payload) this.Field = null;
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
    this.field = _cloneDeep(this.bindValue);
  },
};
</script>

<style scoped>
</style>