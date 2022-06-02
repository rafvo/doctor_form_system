<template>
  <div>
    <SpinnerLoader
      v-if="loading"
      width="3rem"
      height="3rem"
      justify-content="center"
    />
    <template v-else>
      <ValidationObserver ref="observer">
        <b-form>
          <b-row  class="mb-3">
            <b-col>
              <FormTitle title="Sobre o atendimento" />
            </b-col>
          </b-row>

          <b-row class="mb-3">
            <b-col>
              <FormSubtitle title="Detalhes do atendimento" />
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <SpecialtyDropdownField
                v-model="atendimento.profissional.especialidadeId"
                :specialty-id="atendimento.profissional.especialidadeId"
                label="Especialidade principal"
                required
                with-label
                live-search
              />
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col cols="12">
              <MoneyField
                v-model="atendimento.preco"
                :bind-value="atendimento.preco"
                label="Informe o preço da consulta"
                rules="required_money"
                required-label
                with-label
                prefix-in-toolbar
              />
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col cols="12">
              <PaymentMethodCheckboxField
                v-model="atendimento.formasPagamentoAtendimentos"
                :default-checked="atendimento.formasPagamentoAtendimentos"
                required-list
                with-field-label
              />
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <slot name="submitButton"></slot>
            </b-col>
          </b-row>
        </b-form>
      </ValidationObserver>
    </template>
  </div>
</template>

<script>
import SpinnerLoader from "@/components/loaders/SpinnerLoader.vue";
import FormTitle from "@/components/typography/FormTitle.vue";
import FormSubtitle from "@/components/typography/FormSubtitle.vue";
import SpecialtyDropdownField from "@/components/fields/SpecialtyDropdownField.vue";
import MoneyField from "@/components/fields/MoneyField.vue";
import PaymentMethodCheckboxField from "@/components/fields/PaymentMethodCheckboxField.vue";
import Atendimentos from "@/domain/models/atendimentos";

export default {
  components: {
    SpinnerLoader,
    FormTitle,
    FormSubtitle,
    SpecialtyDropdownField,
    MoneyField,
    PaymentMethodCheckboxField,
  },
  props: {
    atendimento: {
      type: Object,
      default: () => new Atendimentos(),
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
};
</script>

<style>
</style>