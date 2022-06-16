<template>
  <div>
    <b-row>
      <b-col>
        <table class="table">
          <thead>
            <tr>
              <th
                v-for="(item, key) in cols"
                :key="key"
                :class="`text-${
                  item[colsAlignProp] ? item[colsAlignProp] : defaultColsAlign
                }`"
              >
                {{ item[colTextProp] }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td :colspan="colspan">
                <SpinnerLoader class="p-40" />
              </td>
            </tr>

            <template v-else-if="existRows">
              <tr v-for="(row, rowKey) in rows" :key="rowKey">
                <td
                  v-for="(rowCol, rowColKey) in rowsProps[rowKey]"
                  :key="rowColKey"
                >
                  <slot :name="rowCol" :item="row">
                    <TextMark
                      v-if="withTextMark"
                      :bind-value="row[rowCol]"
                      :searched-value="searchedValue"
                    />
                    <span v-else>{{ row[rowCol] }}</span>
                  </slot>
                  <slot :name="`extra:${rowCol}`" :item="row"></slot>
                </td>
              </tr>
            </template>

            <tr v-else>
              <td :colspan="colspan">
                <slot name="noRecordsArea">
                  <!-- <b-alert class="mt-3 mb-3" dense outlined type="info">
                      {{ noRecordsMessage }}
                    </b-alert> -->
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { exist } from "@/util/exist";
import SpinnerLoader from "@/components/loaders/SpinnerLoader.vue";
import TextMark from "@/components/markers/TextMark.vue";

export default {
  components: {
    SpinnerLoader,
    TextMark,
  },
  props: {
    cols: {
      type: Array,
      default: () => [
        {
          text: "Dessert (100g serving)",
          align: "left",
          sortable: false,
          filterable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
      ],
    },
    rows: {
      type: Array,
      default: () => [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
      ],
      required: false,
    },
    colsAlignProp: {
      type: String,
      default: "align",
      required: false,
    },
    colTextProp: {
      type: String,
      default: "text",
      required: false,
    },
    colFilterableProp: {
      type: String,
      default: "filterable",
      required: false,
    },
    defaultColsAlign: {
      type: String,
      default: "left",
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
    noRecordsMessage: {
      type: String,
      default: "Nenhum registro encontrado",
      required: false,
    },
    searchedValue: {
      type: [String, Number],
      default: null,
      required: false,
    },
    withTextMark: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      all: [],
    };
  },
  computed: {
    existRows() {
      return exist(this.rows);
    },
    colspan() {
      return this.cols.length;
    },
    filterableCols() {
      return this.cols.filter(
        (f) =>
          f[this.colFilterableProp] || f[this.colFilterableProp] == undefined
      );
    },
    rowsKeys() {
      return Object.keys(this.rows);
    },
    rowsProps() {
      let lines = [];
      this.rows.forEach((m) => {
        lines.push(JSON.parse(JSON.stringify(Object.keys(m))));
      });
      return lines;
    },
  },
  methods: {},
};
</script>

<style>
</style>