<template>
  <div>
    <span v-if="hasInstallments">
      <span>{{ paymentMethodName }}</span>

      <span v-if="installmentsNumber" class="feature-before"
        >Parcelamento em {{ installmentsNumber }}x</span
      >

      <span v-if="installmentsWithInterest" class="space-before"
        >com juros</span
      >
      <span v-else class="space-before">sem juros</span>
    </span>
    <span v-else>
      {{ paymentMethodName }}
    </span>
  </div>
</template>

<script>
import { exist } from "@/util/exist";
import FormaPagamentoAtendimento from "@/domain/models/formaPagamentoAtendimento";

export default {
  props: {
    formaPagamentoAtendimento: {
      type: Object,
      default: () => new FormaPagamentoAtendimento(),
      required: false,
    },
  },
  computed: {
    existServicePaymentMethod() {
      return exist(this.formaPagamentoAtendimento);
    },
    existPaymentMethod() {
      return (
        this.existServicePaymentMethod &&
        exist(this.formaPagamentoAtendimento.formaPagamento)
      );
    },
    paymentMethod() {
      return this.existPaymentMethod
        ? this.formaPagamentoAtendimento.formaPagamento
        : null;
    },
    paymentMethodName() {
      return this.existPaymentMethod ? this.paymentMethod.nome : "";
    },
    hasInstallments() {
      return this.existPaymentMethod ? this.paymentMethod.temParcelas : false;
    },
    installmentsNumber() {
      return this.existServicePaymentMethod
        ? this.formaPagamentoAtendimento.parcelamentoEm
        : 0;
    },
    installmentsWithInterest() {
      return this.existPaymentMethod ? this.paymentMethod.comJuros : false;
    },
  },
};
</script>

<style>
</style>