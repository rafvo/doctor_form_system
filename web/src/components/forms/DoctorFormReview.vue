<template>
  <div>
    <b-row>
      <b-col cols="12" xs="12" md="12">
        <FormTitle title="Revisão do cadastro" /> </b-col
    ></b-row>

    <b-row>
      <b-col cols="12" xs="12" md="6">
        <b-row>
          <b-col cols="12" xs="12" md="12">
            <FormReviewFormat
              label="Nome Completo"
              :description="atendimento.profissional.nome"
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" xs="12" md="12">
            <FormReviewFormat
              label="CPF"
              :show-empty-message="!atendimento.profissional.cpf"
            >
              {{ atendimento.profissional.cpf | cpfcnpj }}
            </FormReviewFormat>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" xs="12" md="12">
            <FormReviewFormat
              label="Número de celular ou telefone"
              :show-empty-message="!atendimento.profissional.phone"
            >
              {{ atendimento.profissional.phone | phoneCelphoneWithDDD }}
            </FormReviewFormat>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" xs="12" md="12">
            <FormReviewFormat
              label="Estado/Cidade"
              :show-empty-message="!atendimento.profissional.cidadeId"
            >
              <CityAndStateInformation
                :city-id="atendimento.profissional.cidadeId"
              />
            </FormReviewFormat>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" xs="12" md="12">
            <FormReviewFormat
              label="Especialidade principal"
              :show-empty-message="!atendimento.profissional.especialidadeId"
            >
              <SpecialtyInformation
                :specialty-id="atendimento.profissional.especialidadeId"
              />
            </FormReviewFormat>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" xs="12" md="12">
            <FormReviewFormat label="Preço da consulta">
              {{ atendimento.preco | currency }}
            </FormReviewFormat>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" xs="12" md="12">
            <FormReviewFormat
              label="Formas de pagamento da consulta"
              :show-empty-message="
                !atendimento.formasPagamentoAtendimentos.length
              "
            >
              <PaymentMethodListInformation
                :formas-pagamento-atendimento="
                  atendimento.formasPagamentoAtendimentos
                "
              />
            </FormReviewFormat>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="12" xs="12" md="12">
            <ProfessionalRegisterButton />
          </b-col>
        </b-row>
      </b-col>

      <b-col cols="12" xs="12" md="6">
        <ImageRender image-loader-computed-prop="doctor3" />
        <!-- <ImageLoader file-name-with-extension="desktop-pagina-3.png"/> -->
        <!-- <b-img :src="imgDoctorReviewForm" fluid></b-img> -->
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Atendimentos from "@/domain/models/atendimentos";
import ImageRender from "@/components/images/ImageRender.vue";
import FormTitle from "@/components/typography/FormTitle.vue";
import FormReviewFormat from "@/components/typography/FormReviewFormat.vue";
import CityAndStateInformation from "@/components/info/CityAndStateInformation.vue";
import SpecialtyInformation from "@/components/info/SpecialtyInformation.vue";
import PaymentMethodListInformation from "@/components/info/PaymentMethodListInformation.vue";
import ProfessionalRegisterButton from "@/components/buttons/ProfessionalRegisterButton.vue";

export default {
  components: {
    ImageRender,
    FormTitle,
    FormReviewFormat,
    CityAndStateInformation,
    SpecialtyInformation,
    PaymentMethodListInformation,
    ProfessionalRegisterButton,
  },
  props: {
    atendimento: {
      type: Object,
      default: () => new Atendimentos(),
      required: false,
    },
  },
};
</script>

<style scoped>
</style>