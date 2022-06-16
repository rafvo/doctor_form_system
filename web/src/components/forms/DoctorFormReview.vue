<template>
  <div>
    <b-row v-if="withTitle">
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
              <CityAndStateInformation :city-id="profissional.cidadeId" />
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

        <FooterRow>
          <b-row class="mt-4">
            <b-col cols="12" xs="12" md="12">
              <slot name="submitButton">
                <ProfessionalRegisterButton
                  v-if="editing"
                  title="Atualizar Profissional"
                  :loading="saving"
                  centered
                  @click:prevent="update"
                />
                <ProfessionalRegisterButton
                  v-else
                  title="Cadastrar Profissional"
                  :loading="saving"
                  centered
                  @click:prevent="insert"
                />

                <slot name="editingButton">
                  <ProfessionalEditButton
                    class="mt-3"
                    centered
                    @click:prevent="emitEdit"
                  />
                </slot>
              </slot>
            </b-col>
          </b-row>
        </FooterRow>
      </b-col>

      <b-col cols="12" xs="12" :md="defaultExtraRowGrid">
        <slot name="extraRow"></slot>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { exist } from "@/util/exist";
import _cloneDeep from "lodash/cloneDeep";
import Profissional from "@/domain/models/profissionais";
import FormTitle from "@/components/typography/FormTitle.vue";
import FormReviewFormat from "@/components/typography/FormReviewFormat.vue";
import CityAndStateInformation from "@/components/info/CityAndStateInformation.vue";
import SpecialtyInformation from "@/components/info/SpecialtyInformation.vue";
import PaymentMethodListInformation from "@/components/info/PaymentMethodListInformation.vue";
import ProfessionalRegisterButton from "@/components/buttons/ProfessionalRegisterButton.vue";
import ProfessionalEditButton from "@/components/buttons/ProfessionalEditButton.vue";
import FooterRow from "@/components/rows/FooterRow.vue";

export default {
  components: {
    FormTitle,
    FormReviewFormat,
    CityAndStateInformation,
    SpecialtyInformation,
    PaymentMethodListInformation,
    ProfessionalRegisterButton,
    ProfessionalEditButton,
    FooterRow
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
    withTitle: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      loading: false,
      saving: false,
    };
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
    professionalId() {
      return this.profissional.id;
    },
    editing() {
      return exist(this.professionalId);
    },
  },
  methods: {
    insert() {
      this.saving = true;
      setTimeout(() => {
        this.$store.dispatch("profissionais/insert", {
          professional: _cloneDeep(this.profissional),
        });
        this.$toast.success("Cadastrado com sucesso!", {
          timeout: 2000,
        });
        this.emitSubmited();
        this.saving = false;
      }, 500);
    },
    update() {
      this.saving = true;
      setTimeout(() => {
        this.$store.dispatch("profissionais/update", {
          id: this.professionalId,
          professional: _cloneDeep(this.profissional),
        });
        this.$toast.success("Atualizado com sucesso!", {
          timeout: 2000,
        });
        this.emitSubmited();
        this.saving = false;
      }, 500);
    },
    emitSubmited(payload = null) {
      this.$emit("submited", payload);
    },
    emitEdit(payload = null) {
      this.$emit("edit", payload);
    },
  },
};
</script>

<style scoped>
</style>