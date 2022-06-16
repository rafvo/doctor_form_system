<template>
  <div>
    <b-link
      href="javascript:void(0)"
      :id="idKey"
      :class="iconButtonClasses"
      @click="(event) => $emit('click', event)"
      @click.prevent="(event) => $emit('click:prevent', event)"
    >
      <b-icon :icon="icon" :animation="animation"></b-icon>
    </b-link>
  </div>
</template>

<script>
export default {
  props: {
    iconButtonClasses: {
      type: String,
      default: "text primary-0",
      required: false,
    },
    icon: {
      type: String,
      default: "chevron-left",
      required: false,
    },
    animation: {
      type: String,
      default: "",
      required: false,
    },
    id: {
      type: [String, Number],
      default: "",
      required: false,
    },
  },
  computed: {
    componentKey() {
      return `${this._uid}`;
    },
    idKey() {
      return this.id ? `${this.id}` : this.componentKey;
    },
  },
};
</script>

<style>
</style>