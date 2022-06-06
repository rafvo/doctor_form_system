<template>
  <div>
    <b-row>
      <b-col cols="12" xs="12" md="12">
        <FormTitle title="Revisão do cadastro" /> </b-col
    ></b-row>

    <b-row>
      <b-col cols="12" xs="12" :md="infoGrid">
        <b-row>
          <b-col cols="12" xs="12" md="12">
            <FormReviewFormat
              label="Nome Completo"
              :description="profissional.nome"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" xs="12" md="12">
            <FormReviewFormat
              label="CPF"
              :show-empty-message="!profissional.cpf"
            >
              {{ profissional.cpf | cpfcnpj }}
            </FormReviewFormat>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" xs="12" md="12">
            <FormReviewFormat
              label="Número de celular ou telefone"
              :show-empty-message="!profissional.phone"
            >
              {{ profissional.phone | phoneCelphoneWithDDD }}
            </FormReviewFormat>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" xs="12" md="12">
            <FormReviewFormat
              label="Estado/Cidade"
              :show-empty-message="!profissional.cidadeId"
            >
              <CityAndStateInformation
                :city-id="profissional.cidadeId"
              />
            </FormReviewFormat>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" xs="12" md="12">
            <FormReviewFormat
              label="Especialidade principal"
              :show-empty-message="!profissional.atendimento.especialidadeId"
            >
              <SpecialtyInformation
                :specialty-id="profissional.atendimento.especialidadeId"
              />
            </FormReviewFormat>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" xs="12" md="12">
            <FormReviewFormat label="Preço da consulta">
              {{ profissional.atendimento.preco | currency }}
            </FormReviewFormat>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" xs="12" md="12">
            <FormReviewFormat
              label="Formas de pagamento da consulta"
              :show-empty-message="
                !profissional.atendimento.formasPagamentoAtendimentos.length
              "
            >
              <PaymentMethodListInformation
                :formas-pagamento-atendimento="
                  profissional.atendimento.formasPagamentoAtendimentos
                "
              />
            </FormReviewFormat>
          </b-col>
        </b-row>

        <b-row class="mt-4">
          <b-col cols="12" xs="12" md="12">
            <slot name="submitButton"></slot>
          </b-col>
        </b-row>
      </b-col>

      <b-col cols="12" xs="12" :md="defaultExtraRowGrid">
        <slot name="extraRow"></slot>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Profissional from "@/domain/models/profissionais";
import FormTitle from "@/components/typography/FormTitle.vue";
import FormReviewFormat from "@/components/typography/FormReviewFormat.vue";
import CityAndStateInformation from "@/components/info/CityAndStateInformation.vue";
import SpecialtyInformation from "@/components/info/SpecialtyInformation.vue";
import PaymentMethodListInformation from "@/components/info/PaymentMethodListInformation.vue";

export default {
  components: {
    FormTitle,
    FormReviewFormat,
    CityAndStateInformation,
    SpecialtyInformation,
    PaymentMethodListInformation,
  },
  props: {
    profissional: {
      type: Object,
      default: () => new Profissional(),
      required: false,
    },
    extraRowGrid: {
      type: [String, Number],
      default: "12",
      required: false,
    },
  },
  computed: {
    maxGrid() {
      return 12;
    },
    defaultExtraRowGrid() {
      return this.extraRowGrid <= this.maxGrid
        ? this.extraRowGrid
        : this.maxGrid;
    },
    infoGrid() {
      return this.defaultExtraRowGrid < this.maxGrid
        ? this.maxGrid - this.defaultExtraRowGrid
        : this.maxGrid;
    },
  },
};
</script>

<style scoped>
</style>