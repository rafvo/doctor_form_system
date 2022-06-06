<template>
  <div>
    <Stepper ref="stepper" :steps="4">
      <StepperContent step="1">
        <Card class="mt-3">
          <b-row>
            <b-col cols="12" xs="12" sm="12" md="12">
              <DoctorAboutProfessionalForm
                :profissional="profissional"
                :loading="loading"
                :extra-row-grid="6"
              >
                <template #extraRow>
                  <ImageRender
                    image-loader-computed-prop="doctor1"
                    :show-in-mobile="false"
                    :show-in-tablet="false"
                  />
                </template>

                <template #submitButton>
                  <FooterRow>
                    <StepperNextButton with-progress />
                  </FooterRow>
                </template>
              </DoctorAboutProfessionalForm>
            </b-col>
          </b-row>
        </Card>
      </StepperContent>

      <StepperContent step="2">
        <StepperPreviousButton class="my-3" />
        <Card>
          <b-row>
            <b-col cols="12" xs="12" md="12">
              <DoctorAboutServiceForm
                :atendimento="profissional.atendimento"
                :loading="loading"
                :extra-row-grid="6"
              >
                <template #extraRow>
                  <ImageRender
                    image-loader-computed-prop="doctor2"
                    :show-in-mobile="false"
                  />
                </template>

                <template #submitButton>
                  <FooterRow>
                    <StepperNextButton with-progress />
                  </FooterRow>
                </template>
              </DoctorAboutServiceForm>
            </b-col>
          </b-row>
        </Card>
      </StepperContent>

      <StepperContent step="3">
        <StepperPreviousButton class="my-3" />
        <Card>
          <b-row>
            <b-col cols="12" xs="12" md="12">
              <DoctorFormReview
                :profissional="profissional"
                :extra-row-grid="6"
              >
                <template #extraRow>
                  <ImageRender
                    image-loader-computed-prop="doctor3"
                    :show-in-mobile="false"
                  />
                </template>

                <template #submitButton>
                  <FooterRow>
                    <StepperSubmitRoundedButton
                      v-if="editing"
                      class="mt-3"
                      title="Atualizar Profissional"
                      :go-to-next-step="false"
                      :loading="saving"
                      centered
                      @click:prevent="update"
                    />
                    <StepperSubmitRoundedButton
                      v-else
                      class="mt-3"
                      title="Cadastrar Profissional"
                      :go-to-next-step="false"
                      :loading="saving"
                      centered
                      @click:prevent="insert"
                    />
                    <StepperNavigationLinkButton
                      class="mt-3"
                      title="Editar Cadastro"
                      :go-to-step="1"
                      centered
                    />
                  </FooterRow>
                </template>
              </DoctorFormReview>
            </b-col>
          </b-row>
        </Card>
      </StepperContent>

      <StepperContent step="4">
        <StepperNavigationRoundedButton
          class="my-3"
          title="Novo Cadastro"
          :go-to-step="1"
          @click:prevent="reset"
        />
        <Card>
          <ProfessionalTable @edit="edit" />
        </Card>
      </StepperContent>
    </Stepper>
  </div>
</template>

<script>
import { exist } from "@/util/exist";
import _cloneDeep from "lodash/cloneDeep";
import Profissional from "@/domain/models/profissionais";
import Card from "@/components/cards/Card.vue";
import FooterRow from "@/components/rows/FooterRow.vue";
import ImageRender from "@/components/images/ImageRender.vue";
import Stepper from "@/components/steppers/Stepper.vue";
import StepperContent from "@/components/steppers/StepperContent.vue";
import StepperPreviousButton from "@/components/steppers/StepperPreviousButton.vue";
import StepperNextButton from "@/components/steppers/StepperNextButton.vue";
import StepperSubmitRoundedButton from "@/components/steppers/StepperSubmitRoundedButton.vue";
import StepperNavigationLinkButton from "@/components/steppers/StepperNavigationLinkButton.vue";
import StepperNavigationRoundedButton from "@/components/steppers/StepperNavigationRoundedButton.vue";
import DoctorAboutProfessionalForm from "./DoctorAboutProfessionalForm.vue";
import DoctorAboutServiceForm from "./DoctorAboutServiceForm.vue";
import DoctorFormReview from "./DoctorFormReview.vue";
import ProfessionalTable from "@/components/tables/ProfessionalTable.vue";

export default {
  components: {
    Card,
    FooterRow,
    ImageRender,
    Stepper,
    StepperContent,
    StepperPreviousButton,
    StepperNextButton,
    StepperSubmitRoundedButton,
    StepperNavigationLinkButton,
    StepperNavigationRoundedButton,
    DoctorAboutProfessionalForm,
    DoctorAboutServiceForm,
    DoctorFormReview,
    ProfessionalTable,
  },
  props: {
    profissional: {
      type: Object,
      default: () => new Profissional(),
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
        this.$refs.stepper.nextStep();
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
        this.$refs.stepper.nextStep();
        this.saving = false;
      }, 500);
    },
    edit(payload) {
      this.profissional.create(payload);
      this.$refs.stepper.goToStep(1);
    },
    reset(){
      this.profissional.create(new Profissional());
    }
  },
};
</script>

<style>
</style>