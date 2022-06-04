<template>
  <div>
    <Stepper :steps="3">
      <StepperContent step="1">
        <Card>
          <b-row>
            <b-col cols="12" xs="12" md="12">
              <DoctorAboutProfessionalForm
                :profissional="atendimento.profissional"
                :loading="loading"
                :extra-row-grid="6"
              >
                <template #extraRow>
                  <ImageRender image-loader-computed-prop="doctor1" />
                </template>

                <template #submitButton>
                  <StepperNextButton class="mt-5" with-progress />
                </template>
              </DoctorAboutProfessionalForm>
            </b-col>
          </b-row>
        </Card>
      </StepperContent>

      <StepperContent step="2">
        <StepperPreviousButton />
        <Card>
          <b-row>
            <b-col cols="12" xs="12" md="12">
              <DoctorAboutServiceForm
                :atendimento="atendimento"
                :loading="loading"
                :extra-row-grid="6"
              >
                <template #submitButton>
                  <StepperNextButton class="mt-5" with-progress />
                </template>

                <template #extraRow>
                  <ImageRender image-loader-computed-prop="doctor2" />
                </template>
              </DoctorAboutServiceForm>
            </b-col>
          </b-row>
        </Card>
      </StepperContent>

      <StepperContent step="3">
        <StepperPreviousButton />
        <Card>
          <b-row>
            <b-col cols="12" xs="12" md="12">
              <DoctorFormReview :atendimento="atendimento" :extra-row-grid="6">
                <template #extraRow>
                  <ImageRender image-loader-computed-prop="doctor3" />
                </template>
              </DoctorFormReview>
            </b-col>
          </b-row>
        </Card>
      </StepperContent>
    </Stepper>
  </div>
</template>

<script>
import ImageRender from "@/components/images/ImageRender.vue";
import Card from "@/components/cards/Card.vue";
import Stepper from "@/components/steppers/Stepper.vue";
import StepperContent from "@/components/steppers/StepperContent.vue";
import DoctorAboutProfessionalForm from "./DoctorAboutProfessionalForm.vue";
import DoctorAboutServiceForm from "./DoctorAboutServiceForm.vue";
import DoctorFormReview from "./DoctorFormReview.vue";
import Atendimentos from "@/domain/models/atendimentos";
import StepperPreviousButton from "@/components/steppers/StepperPreviousButton.vue";
import StepperNextButton from "@/components/steppers/StepperNextButton.vue";

export default {
  components: {
    Card,
    ImageRender,
    Stepper,
    StepperContent,
    DoctorAboutProfessionalForm,
    DoctorAboutServiceForm,
    DoctorFormReview,
    StepperPreviousButton,
    StepperNextButton,
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
    };
  },
  methods: {},
};
</script>

<style>
</style>