<template>
  <div>
    <InlineRow v-if="withFieldLabel">
      <label
        class="white-space-nowrap cursor-pointer mr-7"
        :class="{ required: requiredLabel }"
        >{{ fieldLabel }}</label
      >
    </InlineRow>

    <b-row v-for="(item, key) in list" :key="key">
      <b-col cols="12">
        <CheckboxField
          :bindValue="bindValue(item)"
          :checkedValue="checkedValue(item)"
          :uncheckedValue="uncheckedValue(item)"
          :checkedLabel="checkedLabel(item)"
          :uncheckedLabel="uncheckedLabel(item)"
          :fieldLabel="fieldLabel"
          :rules="rules"
          with-true-false-label
          @checked="add($event, key)"
          @unchecked="remove($event, key)"
        />
        <slot name="extra" :item="item" :index="key"></slot>
      </b-col>
    </b-row>

    <!-- <pre
      >{{ list }}
    </pre> -->
  </div>
</template>

<script>
import Vue from "vue";
import { exist } from "@/util/exist";
import _cloneDeep from "lodash/cloneDeep";
import CheckboxField from "./CheckboxField.vue";
// import Card from "@/components/cards/Card.vue";
import InlineRow from "@/components/rows/InlineRow.vue";

export default {
  components: {
    CheckboxField,
    //Card,
    InlineRow,
  },
  props: {
    bindValueProp: {
      default: "fieldId",
      required: false,
    },
    checkedValueProp: {
      type: String,
      default: "id",
      required: false,
    },
    checkedLabelProp: {
      type: String,
      default: "name",
      required: false,
    },
    defaultChecked: {
      type: Array,
      default: () => [],
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
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
    name: {
      type: String,
      default: null,
      required: false,
    },
    options: {
      type: Array,
      default: () => [
        { id: 1, fieldId: null, name: "Opção 1" },
        { id: 2, fieldId: null, name: "Opção 2" },
      ],
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
    reset: {
      type: [Number, Boolean],
      default: false,
      required: false,
    },
    returnObject: {
      type: Boolean,
      default: false,
      required: false,
    },
    uncheckedValueProp: {
      type: String,
      default: "",
      required: false,
    },
    uncheckedLabelProp: {
      type: String,
      default: "name",
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
      oldList: null,
      oldChecked: null,
      list: [],
      checked: {},
    };
  },
  computed: {
    List: {
      get() {
        return this.list;
      },
      set(payload) {
        if (!payload) payload = [];
        this.list = payload;
        this.Checked = _cloneDeep(this.checkedList(payload));
      },
    },
    OldList: {
      get() {
        return this.oldList;
      },
      set(payload) {
        if (!payload) payload = [];
        this.oldList = payload;
        this.emitOldList();
      },
    },
    Checked: {
      get() {
        return this.checked;
      },
      set(payload) {
        if (!payload) payload = {};

        this.checked = payload;
        this.OldChecked = _cloneDeep(this.checked);
        this.emitInput();
      },
    },
    OldChecked: {
      get() {
        return this.oldChecked;
      },
      set(payload) {
        if (!payload) payload = {};

        this.oldChecked = payload;
        this.emitOldChecked();
      },
    },
    existList() {
      return exist(this.list);
    },
    uncheckedValuePropSplit() {
      return this.uncheckedValueProp.split(".");
    },
  },
  methods: {
    bindValue(obj) {
      return this.getObjValueByString(obj, { str: this.bindValueProp });
    },
    checkedValue(obj) {
      return this.getObjValueByString(obj, { str: this.checkedValueProp });
    },
    checkedLabel(obj) {
      return this.getObjValueByString(obj, { str: this.checkedLabelProp });
    },
    uncheckedValue(obj) {
      return this.getObjValueByString(obj, { str: this.uncheckedValueProp });
    },
    uncheckedLabel(obj) {
      return this.getObjValueByString(obj, { str: this.uncheckedLabelProp });
    },
    getObjValueByString(obj, { str } = {}) {
      if (!str) return null;

      const value = str.split(".").reduce(function (p, prop) {
        return p[prop];
      }, obj);

      return value;
    },
    existItem(key) {
      return Boolean(this.checked && this.checked[key]);
    },
    add(value, key) {
      if (this.existItem(key)) return;

      this.list[key][this.bindValueProp] = value;
      const item = _cloneDeep(this.list[key]);

      Vue.set(this.checked, key, item);

      this.emitInput();
    },
    remove(value, key) {
      console.log(key);
      this.list[key][this.bindValueProp] = null;
      Vue.delete(this.checked, key);
      this.emitInput();
    },
    checkedList(payload) {
      if (!exist(payload)) return {};

      var obj = {};

      payload.forEach((item, key) => {
        if (item[this.bindValueProp] != null) Vue.set(obj, key, item);
      });

      return obj;
    },
    emitOldChecked() {
      this.$emit("oldChecked", Object.values(this.oldChecked));
    },
    emitOldList() {
      this.$emit("oldList", this.oldList);
    },
    emitInput() {
      if (this.returnObject) this.$emit("input", this.checked);
      else this.$emit("input", Object.values(this.checked));
    },
  },
  created() {
    this.List = _cloneDeep(this.options);
    this.OldList = _cloneDeep(this.list);
  },
};
</script>

<style>
</style>

<!--
withDefaultChecked() {
      let list = _cloneDeep(this.options);

      for (const keyA in list) {
        for (const keyB in this.defaultChecked) {
          const listCheckedValue = this.checkedValue(this.list[keyA]);
          const defaultCheckedValue = this.checkedValue(
            this.defaultChecked[keyB]
          );

          if (listCheckedValue == defaultCheckedValue) {
            const defaultCheckedBindValue = this.bindValue(this.defaultChecked[keyB]);
            list[keyA][this.bindValueProp] = defaultCheckedBindValue;
            break;
          }
        }
      }

      console.log(list);

      return list;
    },
    // rowsKeys() {
    //   return Object.keys(this.options);
    // },
    // rowsProps() {
    //   return this.options.reduce((acc, value) => {
    //     acc.push(JSON.parse(JSON.stringify(Object.keys(value))));
    //     return acc;
    //   }, []);
    // },

      // let lines = [];
      // this.options.forEach((m) => {
      //   lines.push(JSON.parse(JSON.stringify(Object.keys(m))));
      // });
      // return lines;


      -->