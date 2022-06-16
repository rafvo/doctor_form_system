<template>
  <InlineRow>
    <b-button
      class="mr-7"
      variant="light"
      @click.prevent="previousPage()"
      :disabled="!enablePreviousPage"
    >
      <b-icon icon="chevron-left" scale=".8"></b-icon>
    </b-button>

    <div v-for="n in length" :key="n">
      <ButtonPagination v-model="page" :page="n" />
    </div>

    <b-button
      class="mr-7"
      variant="light"
      @click.prevent="nextPage()"
      :disabled="!enableNextPage"
    >
      <b-icon icon="chevron-right" scale=".8"></b-icon>
    </b-button>
    {{ page }}
  </InlineRow>
</template>

<script>
import InlineRow from "@/components/rows/InlineRow.vue";
import ButtonPagination from "@/components/pagination/ButtonPagination.vue";

export default {
  components: {
    InlineRow,
    ButtonPagination,
  },
  props: {
    bindValue: {
      type: Number,
      default: 0,
      required: false,
    },
    length: {
      type: Number,
      default: 0,
      required: false,
    },
    visible: {
      type: Number,
      default: 7,
      required: false,
    },
  },
  provide() {
    return {
      currentPage: () => this.page,
      firstVisible: () => this.firstVisible,
    };
  },
  data() {
    return {
      page: 0,
    };
  },
  computed: {
    enablePreviousPage() {
      return this.page > 1;
    },
    enableNextPage() {
      return this.page != this.length;
    },
    previousPageNumber(){
      let page = this.page;
      return page-=1;
    },
    nextPageNumber(){
      let page = this.page;
      return page+=1;
    },
    middle(){
      return Math.ceil(this.visible / 2)
    }
  },
  watch: {
    bindValue() {
      this.page = this.bindValue;
    },
  },
  methods: {
    previousPage() {
      if (!this.enablePreviousPage) return;
      this.page--;
    },
    nextPage() {
      if (!this.enableNextPage) return;
      this.page++;
    },
  },
  mounted() {
    this.page = this.bindValue;
  },
};
</script>

<style>
</style>