<template>
  <div>
    <p v-for="(model, key) in formasPagamentoAtendimento" :key="key" class="m-0">
      <InlineRow>
        <b-icon icon="dot"></b-icon
        ><PaymentMethodItemInformation :forma-pagamento-atendimento="model" />
      </InlineRow>
    </p>
  </div>
</template>

<script>
import InlineRow from "@/components/rows/InlineRow.vue";
import PaymentMethodItemInformation from "@/components/info/PaymentMethodItemInformation.vue";

export default {
  components: {
    InlineRow,
    PaymentMethodItemInformation,
  },
  props: {
    formasPagamentoAtendimento: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
};
</script>

<style>
</style>