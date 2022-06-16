<template>
  <div>
    <Stepper ref="stepper" :steps="4">
      <StepperTabs with-card with-valid-icon with-invalid-icon>
        <StepperTabItem step="1" title="Sobre o profissional">
          <b-row>
            <b-col cols="12" xs="12" sm="12" md="12">
              <DoctorAboutProfessionalForm
                :profissional="profissional"
                :loading="loading"
                :extra-row-grid="6"
                with-subtitle
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
        </StepperTabItem>

        <StepperTabItem step="2" title="Sobre o atendimento">
          <b-row>
            <b-col cols="12" xs="12" md="12">
              <DoctorAboutServiceForm
                :atendimento="profissional.atendimento"
                :loading="loading"
                :extra-row-grid="6"
                with-subtitle
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
        </StepperTabItem>

        <StepperTabItem step="3" title="Revisão do cadastro">
          <b-row>
            <b-col cols="12" xs="12" md="12">
              <DoctorFormReview
                :profissional="profissional"
                :extra-row-grid="6"
                @submited="nextStep"
                @edit="goToStep(1)"
              >
                <template #extraRow>
                  <ImageRender
                    image-loader-computed-prop="doctor3"
                    :show-in-mobile="false"
                  />
                </template>
              </DoctorFormReview>
            </b-col>
          </b-row>
        </StepperTabItem>

        <StepperTabItem step="4" title="Conclusão">
          <StepperNavigationRoundedButton
            class="my-3"
            title="Novo Cadastro"
            :go-to-step="1"
            @click:prevent="reset"
          />

          <ProfessionalTable @edit="edit" />
        </StepperTabItem>
      </StepperTabs>
    </Stepper>
  </div>
</template>

<script>
import Profissional from "@/domain/models/profissionais";
import FooterRow from "@/components/rows/FooterRow.vue";
import ImageRender from "@/components/images/ImageRender.vue";
import Stepper from "@/components/steppers/Stepper.vue";
import StepperTabs from "@/components/steppers/StepperTabs.vue";
import StepperTabItem from "@/components/steppers/StepperTabItem.vue";
import StepperNextButton from "@/components/steppers/StepperNextButton.vue";
import StepperNavigationRoundedButton from "@/components/steppers/StepperNavigationRoundedButton.vue";
import DoctorAboutProfessionalForm from "./DoctorAboutProfessionalForm.vue";
import DoctorAboutServiceForm from "./DoctorAboutServiceForm.vue";
import DoctorFormReview from "./DoctorFormReview.vue";
import ProfessionalTable from "@/components/tables/ProfessionalTable.vue";

export default {
  components: {
    FooterRow,
    ImageRender,
    Stepper,
    StepperTabs,
    StepperTabItem,
    StepperNextButton,
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
    };
  },
  methods: {
    nextStep() {
      this.$refs.stepper.nextStep();
    },
    goToStep(step) {
      this.$refs.stepper.goToStep(step);
    },
    edit(payload) {
      this.profissional.create(payload);
      this.goToStep(1);
    },
    reset() {
      this.profissional.create(new Profissional());
    },
  },
};
</script>

<style>
</style>