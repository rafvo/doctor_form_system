<template>
  <div>
    <b-row v-if="withFieldLabel">
      <b-col>
        <FieldLabel :label="fieldLabel" :required="requiredLabel" />
      </b-col>
    </b-row>

    <b-row
      v-for="obj in clonedOptions"
      :key="checkedValue(obj)"
      :class="{ 'mt-3': cardCheckbox }"
    >
      <b-col cols="12">
        <b-card
          class="text-left"
          :style="{
            visibility: cardCheckbox ? 'visible' : 'hidden',
          }"
        >
          <div class="checkbox-content">
            <CheckboxField
              :bindValue="checkedBindValue(checkedValue(obj))"
              :checkedValue="checkedValue(obj)"
              :uncheckedValue="uncheckedValue(obj)"
              :checkedLabel="checkedLabel(obj)"
              :uncheckedLabel="uncheckedLabel(obj)"
              :fieldLabel="fieldLabel"
              :rules="rules"
              with-true-false-label
              @checked="add($event, { obj: obj, key: checkedValue(obj) })"
              @unchecked="remove($event, { key: checkedValue(obj) })"
            />
            <slot
              :obj="obj"
              :index="checkedValue(obj)"
              :checked="checked[checkedValue(obj)]"
              :checkedBindValue="checkedBindValue(checkedValue(obj))"
            ></slot>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Vue from "vue";
import { getObjValue, assign } from "@/util/objects";
import { exist } from "@/util/exist";
import _cloneDeep from "lodash/cloneDeep";
import CheckboxField from "./CheckboxField.vue";
import FieldLabel from "@/components/label/FieldLabel.vue";

export default {
  components: {
    CheckboxField,
    FieldLabel,
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
    cardCheckbox: {
      type: Boolean,
      default: false,
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
      clonedOptions: [],
      checked: {},
    };
  },
  computed: {
    ClonedOptions: {
      get() {
        return this.clonedOptions;
      },
      set(arr) {
        if (!arr) arr = [];
        this.clonedOptions = arr;
        this.Checked = _cloneDeep(this.checkedOptions());
      },
    },
    OldList: {
      get() {
        return this.oldList;
      },
      set(arr) {
        if (!arr) arr = [];
        this.oldList = arr;
        this.emitOldList();
      },
    },
    Checked: {
      get() {
        return this.checked;
      },
      set(obj) {
        if (!obj) obj = {};

        this.checked = obj;
        this.OldChecked = _cloneDeep(this.checked);
        this.emitInput();
      },
    },
    existList() {
      return exist(this.list);
    },
    objectOptions() {
      return this.clonedOptions.reduce((acc, obj) => {
        Vue.set(acc, this.checkedValue(obj), obj);
        return acc;
      }, {});
    },
  },
  methods: {
    objBindValue(obj) {
      return getObjValue(obj, { key: this.bindValueProp });
    },
    checkedBindValue(key) {
      if (!this.existCheckedObj(key)) return null;
      return getObjValue(this.checked[key], { key: this.bindValueProp });
    },
    checkedValue(obj) {
      return getObjValue(obj, { key: this.checkedValueProp });
    },
    checkedLabel(obj) {
      return getObjValue(obj, { key: this.checkedLabelProp });
    },
    uncheckedValue(obj) {
      return getObjValue(obj, { key: this.uncheckedValueProp });
    },
    uncheckedLabel(obj) {
      return getObjValue(obj, { key: this.uncheckedLabelProp });
    },
    existBindValue(obj) {
      return exist(this.objBindValue(obj));
    },
    existCheckedObj(key) {
      return this.checked && this.checked[key];
    },
    add(value, { obj, key } = {}) {
      if (this.existCheckedObj(key)) return;
      assign(obj, this.bindValueProp, this.checkedValue(obj));
      Vue.set(this.checked, key, obj);
      this.emitInput();
    },
    remove(value, { key } = {}) {
      Vue.delete(this.checked, key);
      this.emitInput();
    },
    checkedOptions() {
      let arr = _cloneDeep(this.defaultChecked);
      return arr.reduce((acc, obj) => {
        if (this.existBindValue(obj)) {
          Vue.set(acc, this.checkedValue(obj), obj);
          return acc;
        }
      }, {});
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
    this.clonedOptions = _cloneDeep(this.options);
    this.Checked = _cloneDeep(this.checkedOptions());
  },
};
</script>

<style scoped>
.card {
  background: #fafafa;
  border-radius: 9px;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1);
}

.card .card-body > .checkbox-content {
  visibility: visible !important;
}
</style>

<!--
    //assign(acc, this.bindValueProp, this.checkedValue(obj));
    // checkedList(payload) {
    //   if (!exist(payload)) return {};
    //   var obj = {};
    //   payload.forEach((item, key) => {
    //     if (item[this.bindValueProp] != null) Vue.set(obj, key, item);
    //   });
    //   return obj;
    // },

     // this.list[key][this.bindValueProp] = value;
      // this.list[key][this.bindValueProp] = null;
    -->