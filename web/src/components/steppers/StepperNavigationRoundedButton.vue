<template>
  <div>
    <InlineRow
      :class="{ 'd-flex justify-content-center text-center': centered }"
    >
      <RoundedButton
        class="btn-primary-0"
        :title="title"
        :disabled="!validGoToStep"
        @click:prevent="onClickPrevent"
      />
      <b-icon
        v-if="!validGoToStep"
        class="ml-5"
        icon="exclamation-circle"
        style="width: 20px; height: 20px"
        animation="fade"
        v-b-tooltip.hover
        :title="`Não é possível retornar para o passo ${goToStep}`"
      ></b-icon>
    </InlineRow>
  </div>
</template>

<script>
import StepperNavigation from "@/mixins/StepperNavigation";
import InlineRow from "@/components/rows/InlineRow.vue";
import RoundedButton from "@/components/buttons/RoundedButton.vue";

export default {
  mixins: [StepperNavigation],
  components: {
    InlineRow,
    RoundedButton,
  },
  props: {
    title: {
      type: String,
      default: "{Title}",
      required: false,
    },
    centered: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  methods: {
    onClickPrevent(event) {
      this.$emit("click:prevent", event);
      this.stepperGoTo();
    },
  },
};
</script>

<style>
</style>