<template>
  <div
    class="dropdown position-relative"
    v-click-outside="focusOut"
    @mouseleave="dropdownLeave"
  >
    <div class="input-dropdown-area position-relative">
      <b-form-input
        :ref="inputDropdownRef"
        :state="validField"
        class="cursor-pointer input-dropdown"
        type="text"
        :placeholder="placeholder"
        :value="selectedLabel"
        readonly
        @click="dropdownIn"
      />
      <span
        class="input-dropdown-btn arrow-2 arrow-down cursor-pointer"
        :class="{ 'invalid-arrow': !valid }"
        @click="dropdownIn"
      ></span>
    </div>
    <b-list-group v-if="focus" @mouseover="focusIn" class="select-search-list">
      <template v-if="loading">
        <b-list-group-item>
          <i class="fa fa-spinner fa-spin"></i>
          <span>Carregando...</span>
        </b-list-group-item>
      </template>
      <template v-else>
        <template v-if="existOptions">
          <b-list-group-item
            v-if="liveSearch"
            class="sticky-top input-search px-10"
          >
            <b-form-input
              :ref="inputSearchRef"
              v-model="Keyword"
              :placeholder="searchPlaceholder"
              :autofocus="focus"
            ></b-form-input>
          </b-list-group-item>

          <template v-if="searchList.length">
            <b-list-group-item
              :ref="`${uniqueKeyUid}_${index}`"
              v-for="(item, index) in searchList"
              :key="index"
              class="cursor-pointer autocomplete-item"
              @click="onSelect(item)"
            >
              {{ item[labelOptionKey] }}
            </b-list-group-item>
          </template>
          <template v-else>
            <b-list-group-item class="cursor-pointer autocomplete-item">
              Nenhuma opção encontrada
            </b-list-group-item>
          </template>
        </template>
      </template>
    </b-list-group>
  </div>
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";
import { exist } from "@/util/exist";

export default {
  props: {
    options: {
      type: Array,
      default: () => [{ id: null, label: "Selecione" }],
      required: true,
    },
    validField: {
      type: Boolean,
      default: true,
      required: false,
    },
    bindValue: {
      type: [String, Number],
      default: null,
      required: false,
    },
    labelOptionKey: {
      type: String,
      default: "label",
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
    liveSearch: {
      type: Boolean,
      default: false,
      required: false,
    },
    placeholder: {
      type: String,
      default: "Selecione",
      required: false,
    },
    required: {
      type: Boolean,
      default: false,
      required: false,
    },
    rollback: {
      type: Boolean,
      default: false,
      required: false,
    },
    searchPlaceholder: {
      type: String,
      default: "Buscar",
      required: false,
    },
    uniqueOptionKey: {
      type: String,
      default: "id",
      required: false,
    },
    valid: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      uniqueKey: null,
      keyword: "",
      selected: {},
      focus: false,
      mouseIn: false,
    };
  },
  computed: {
    Keyword: {
      get() {
        return this.keyword;
      },
      set(v) {
        this.keyword = v;
      },
    },
    Selected: {
      get() {
        return this.selected;
      },
      set(v) {
        if (!v) v = {};
        this.selected = v;
        this.uniqueKey = this.selected[this.uniqueOptionKey];

        this.focus = false;
        this.Keyword = "";

        this.emitSelected();
        this.emitInput();
      },
    },
    Focus: {
      get() {
        return this.focus;
      },
      set(v) {
        if (!v) v = false;
        this.focus = v;
      },
    },
    uniqueKeyUid() {
      return `${this._uid}`;
    },
    inputDropdownRef() {
      return `${this.uniqueKeyUid}_input_dropdown_ref`;
    },
    inputSearchRef() {
      return `${this.uniqueKeyUid}_input_search_ref`;
    },
    uniqueKeyRef() {
      return `${this.uniqueKeyUid}_ref`;
    },
    existOptions() {
      return exist(this.options);
    },
    existSelected() {
      return exist(this.selected);
    },
    existSelectedObject() {
      return exist(this.selectedObject);
    },
    existSelectedLabel() {
      if (!this.existSelectedObject) return false;
      return exist(this.selectedObject[this.labelOptionKey]);
    },
    selectedObject() {
      const list = this.options.filter(
        (f) => f[this.uniqueOptionKey] == this.uniqueKey
      );

      return list[0];
    },
    selectedLabel() {
      if (!this.existSelectedLabel) return "";
      return this.selectedObject[this.labelOptionKey];
    },
    searchList() {
      if (!this.keyword) return this.options;

      const list = this.options.filter(
        (w) =>
          w[this.labelOptionKey]
            .toString()
            .toLowerCase()
            .indexOf(this.keyword.toLowerCase()) >= 0
      );

      return list;
    },
  },
  watch: {
    rollback(payload) {
      if (!payload) return;

      this.uniqueKey = _cloneDeep(this.bindValue);
      this.selected = _cloneDeep(this.seletedObject);
    },
  },
  methods: {
    reset() {
      this.Selected = {};
    },
    onSelect(opt) {
      this.Selected = opt;
    },
    dropdownIn() {
      this.mouseIn = true;
      this.focus = true;
    },
    dropdownLeave() {
      this.mouseIn = false;
    },
    focusIn() {
      this.mouseIn = true;
      this.focus = true;
    },
    focusOut() {
      this.focus = false;
    },
    inputEsc() {
      this.focus = false;
    },
    escKey($event) {
      if ($event.keyCode === 27) {
        this.focus = false;
      }
    },
    emitSelected() {
      this.$emit("selected", this.Selected);
    },
    emitInput() {
      this.$emit("input", this.uniqueKey);
    },
  },
  mounted() {
    this.uniqueKey = _cloneDeep(this.bindValue);

    document.addEventListener("keyup", this.escKey);
  },
  destroyed() {
    document.removeEventListener("keyup", this.escKey);
  },
};
</script>

<style scoped>
.input-dropdown-area input[readonly] {
  background-color: #fff;
}

.input-search:hover {
  background: #fff !important;
}

.input-dropdown-btn {
  position: absolute;
  top: 14px;
  right: 10px;
}

.select-search-list {
  position: absolute;
  width: 100%;
  z-index: 5000;
  max-height: 300px;
  overflow: auto;
  text-align: left;
  /* padding-bottom: 20px; */
}
</style>

<!--

.input-dropdown-btn {
  /* background-image: url("~@/assets/images/indicative-dropdown.png"); */
  background-position: center;
  background-repeat: no-repeat;
  background-size: 7px 7px;
  position: absolute;
  width: 30px;
  top: 0;
  right: 0;
  height: 100%;
  border-left: 1px solid #ddd;
}


    // seletedObject() {
    //   return this.options
    //     .filter((f) => f[this.uniqueOptionKey] == this.bindValue)
    //     .shift();
    // },

    -->