<template>
  <div>
    <Stepper ref="stepper" :steps="4">
      <StepperContent step="1">
        <Card class="mt-3">
          <b-row>
            <b-col cols="12" xs="12" sm="12" md="12">
              <DoctorAboutProfessionalForm
                :profissional="atendimento.profissional"
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
        <StepperPreviousButton class="my-3"/>
        <Card>
          <b-row>
            <b-col cols="12" xs="12" md="12">
              <DoctorAboutServiceForm
                :atendimento="atendimento"
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
        <StepperPreviousButton class="my-3"/>
        <Card>
          <b-row>
            <b-col cols="12" xs="12" md="12">
              <DoctorFormReview :atendimento="atendimento" :extra-row-grid="6">
                <template #extraRow>
                  <ImageRender
                    image-loader-computed-prop="doctor3"
                    :show-in-mobile="false"
                  />
                </template>

                <template #submitButton>
                  <FooterRow>
                    <StepperSubmitRoundedButton
                      class="mt-3"
                      title="Cadastrar Profissional"
                      :go-to-next-step="false"
                      :loading="inserting"
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
        <StepperPreviousButton />
        <Card>
          <h1>Página final</h1>
        </Card>
      </StepperContent>
    </Stepper>
  </div>
</template>

<script>
import Atendimentos from "@/domain/models/atendimentos";
import Card from "@/components/cards/Card.vue";
import FooterRow from "@/components/rows/FooterRow.vue";
import ImageRender from "@/components/images/ImageRender.vue";
import Stepper from "@/components/steppers/Stepper.vue";
import StepperContent from "@/components/steppers/StepperContent.vue";
import StepperPreviousButton from "@/components/steppers/StepperPreviousButton.vue";
import StepperNextButton from "@/components/steppers/StepperNextButton.vue";
import StepperSubmitRoundedButton from "@/components/steppers/StepperSubmitRoundedButton.vue";
import StepperNavigationLinkButton from "@/components/steppers/StepperNavigationLinkButton.vue";
import DoctorAboutProfessionalForm from "./DoctorAboutProfessionalForm.vue";
import DoctorAboutServiceForm from "./DoctorAboutServiceForm.vue";
import DoctorFormReview from "./DoctorFormReview.vue";

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
    DoctorAboutProfessionalForm,
    DoctorAboutServiceForm,
    DoctorFormReview,
  },
  props: {
    atendimento: {
      type: Object,
      default: () => new Atendimentos(),
      required: false,
    },
  },
  data() {
    return {
      loading: false,
      inserting: false,
    };
  },
  methods: {
    insert() {
      this.inserting = true;
      setTimeout(() => {
        this.$toast.success("Cadastrado com sucesso!", {
          timeout: 2000,
        });
        this.$refs.stepper.nextStep();
        this.inserting = false;
      }, 500);
    },
  },
};
</script>

<style>
</style>