<template>
  <div>
    <b-form-group
      :class="{ 'inline-block': inlineOptions && inlineLabel }"
      v-slot="{ ariaDescribedby }"
    >
      <ValidationProvider v-slot="{ errors }" :name="fieldLabel" :rules="rules">
        <label
          v-if="withFieldLabel"
          :class="{ required: requiredLabel }"
          class="mr-5"
          >{{ fieldLabel }}</label
        >
        <b-form-radio-group
          :class="{ 'd-flex flex-direction-row': inlineOptions }"
          :id="uniqueKey"
          :name="uniqueNameKey"
          v-model="Field"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-radio
            v-for="(opt, key) in options"
            :key="key"
            :value="opt[uniqueOptionKey]"
          >
            <span class="ml-5 mr-10">{{ opt[labelOptionKey] }}</span>
          </b-form-radio>
        </b-form-radio-group>
        <VeeValidateErrorMessage :vv-errors="errors" />
      </ValidationProvider>
    </b-form-group>
  </div>
</template>

<script>
import VeeValidateErrorMessage from "@/components/veeValidate/VeeValidateErrorMessage";

export default {
  components: {
    VeeValidateErrorMessage,
  },
  props: {
    bindValue: {
      type: [String, Number],
      default: "",
      required: false,
    },
    options: {
      type: Array,
      default: () => [
        { text: "Opção 1", value: 1 },
        { text: "Opção 2", value: 2 },
      ],
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
      default: "{Campo}",
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
  data() {
    return {
      field: null,
      selected: null,
    };
  },
  computed: {
    Field: {
      get() {
        return this.field;
      },
      set(v) {
        this.field = v;
        this.selected = this.selectedOption();

        this.emitInput();
        this.emitObject();
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
  },
  methods: {
    setBindValue() {
      this.field = this.bindValue;
      this.selected = this.selectedOption();
    },
    selectedOption() {
      return this.options
        .filter((f) => f[this.uniqueOptionKey] == this.field)
        .shift();
    },
    emitInput() {
      this.$emit("input", this.field);
    },
    emitObject() {
      this.$emit("object", this.selected);
    },
  },
  mounted() {
    this.setBindValue();
  },
};
</script>

<style scoped>
label {
  margin-bottom: 0px !important;
}
</style>