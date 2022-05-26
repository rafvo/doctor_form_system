<template>
  <div class="text-field">
    <b-row>
      <b-col>
        <b-form-group>
          <label :class="{ required: requiredLabel }" :for="uniqueKey">{{
            label
          }}</label>
          <ValidationProvider
            :ref="providerRef"
            :vid="providerVid"
            :name="label"
            :rules="allRules"
            v-slot="{ errors }"
          >
            <b-form-input
              v-model="Field"
              :value="bindValue"
              v-mask="mask"
              :ref="fieldRef"
              :id="uniqueKey"
              :name="uniqueNameKey"
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
import VeeValidateErrorMessage from "@/components/veeValidate/VeeValidateErrorMessage";

export default {
  components: {
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