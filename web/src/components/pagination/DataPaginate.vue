<template>
  <div>
    <!-- header -->
    <InlineRow>
      <slot name="header">
        <span class="mr-5">{{ headerTitle }}</span>
      </slot>

      <!-- <SearchField
        v-if="withSearch"
        v-model="find"
        :disabled="loading"
        single-line
        hide-details
      /> -->

      <b-form-input
        v-if="withSearch"
        v-model="find"
        :disabled="loading"
        placeholder="Buscar"
      ></b-form-input>
    </InlineRow>

    <!-- content -->
    <slot
      :searchedValue="find"
      :searchRows="searchRows"
      :currentPageRows="currentPageRows"
      :currentPage="currentPage"
    ></slot>

    <!-- footer -->
    <InlineRow>
      <small class="mr-2">Registros por página: </small>
      <b-row>
        <b-col cols="2">
          <!-- <v-select
            v-model="perPage"
            :items="perPageAll"
            :disabled="loading"
            item-text="text"
            item-value="id"
            return-object
          ></v-select> -->
        </b-col>
      </b-row>
      <b-row>
        <b-col class="d-flex justify-content-end align-items-center">
          <small class="mr-2">{{
            `Página ${currentPage}-${perPageNumber} de ${totalRows} registros`
          }}</small>
          <!-- <v-btn
            icon
            :disabled="!validPreviousPage"
            @click.prevent="currentPage -= 1"
          >
            <b-icon icon="chevron_left"></b-icon>
          </v-btn>
          <v-btn
            icon
            :disabled="!validNextPage"
            @click.prevent="currentPage += 1"
          >
            <b-icon icon="chevron_right"></b-icon>
          </v-btn> -->
        </b-col>
      </b-row>
    </InlineRow>
  </div>
</template>

<script>
import { exist } from "@/util/exist";
import _cloneDeep from "lodash/cloneDeep";
import InlineRow from "@/components/rows/InlineRow.vue";
// import SearchField from "@/components/fields/SearchField.vue";

export default {
  components: {
    InlineRow,
    // SearchField,
  },
  props: {
    backEndSearch: {
      type: Boolean,
      default: false,
      required: false,
    },
    cols: {
      type: Array,
      default: () => [],
      required: false,
    },
    headerTitle: {
      type: String,
      default: "{Paginação}",
      required: false,
    },
    initialPerPage: {
      type: [Number, String],
      default: 10,
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
    perPageOptions: {
      type: Array,
      default: () => [1, 2, 5, 10, 15, 20, 25, 50, 100],
      required: false,
    },
    rows: {
      type: Array,
      default: () => [],
      required: false,
    },
    withSearch: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      perPage: null,
      perPageAll: [],
      currentPage: 1,
      find: "",
    };
  },
  computed: {
    existSearchRows() {
      return exist(this.searchRows);
    },
    existPaginatedRows() {
      return exist(this.paginatedRows);
    },
    existCurrentPageRows() {
      return Boolean(
        this.existPaginatedRows && exist(this.paginatedRows[this.currentPage])
      );
    },
    rowsProps() {
      let lines = [];
      this.rows.forEach((m) => {
        lines.push(JSON.parse(JSON.stringify(Object.keys(m))));
      });
      return lines;
    },
    paginatedRows() {
      if (!this.existSearchRows) return [];

      var list = [];
      var initialKey = 0;
      var finalKey = this.perPageNumber;
      for (var page = 1; page <= this.totalPages; page++) {
        list[page] = [];
        for (let index = initialKey; index < finalKey; index++) {
          const item = this.searchRows[index];
          if (item) list[page].push(item);
        }
        initialKey = finalKey;
        finalKey += this.perPageNumber;
      }
      return list;
    },
    showAllItems() {
      return !exist(this.perPage.id);
    },
    currentPageRows() {
      if (this.showAllItems) return this.searchRows;
      return this.existCurrentPageRows
        ? this.paginatedRows[this.currentPage]
        : [];
    },
    searchRows() {
      if (!this.find || this.backEndSearch) return this.rows;
      let result = [];
      for (const rowKey in this.rows) {
        const row = this.rows[rowKey];
        for (const rowColKey in this.rowsProps[rowKey]) {
          const rowCol = this.rowsProps[rowKey][rowColKey];
          if (this.valueInSearch(row[rowCol])) {
            result.push(this.rows[rowKey]);
            break;
          }
        }
      }
      return result;
    },
    previousPage() {
      var page = _cloneDeep(this.currentPage);
      return (page -= 1);
    },
    nextPage() {
      var page = _cloneDeep(this.currentPage);
      return (page += 1);
    },
    validPreviousPage() {
      return Boolean(this.previousPage >= 1);
    },
    validNextPage() {
      return Boolean(this.nextPage <= this.totalPages);
    },
    defaultInitialPerPage() {
      return this.initialPerPage ? this.initialPerPage : 10;
    },
    perPageNumber() {
      return this.perPage ? this.perPage.id : this.defaultInitialPerPage;
    },
    totalRows() {
      return this.rows.length;
    },
    totalPages() {
      if (!this.perPageNumber) return 1;
      return parseInt(Math.ceil(this.totalRows / this.perPageNumber).toFixed());
    },
  },
  methods: {
    valueInSearch(value) {
      if (!this.find) return false;
      return Boolean(
        value.toString().toLowerCase().indexOf(this.find.toLowerCase()) >= 0
      );
    },
    perPageList() {
      let list = [];
      this.perPageOptions.filter((f) => {
        list.push({
          id: f,
          text: f,
        });
      });
      return [...[{ id: null, text: "Todos" }], ...list];
    },
    selectedPerPageOption() {
      return this.perPageAll.filter((f) => f.id == this.initialPerPage).shift();
    },
  },
  created() {
    this.perPageAll = _cloneDeep(this.perPageList());
    this.perPage = _cloneDeep(this.selectedPerPageOption());
  },
};
</script>

<style>
</style>