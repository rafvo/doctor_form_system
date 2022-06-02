<template>
  <div>
    <Card>
      <AboutProfessionalForm
        :profissional="atendimento.profissional"
        :loading="loading"
      >
      </AboutProfessionalForm>
    </Card>
    <Card>
      <AboutServiceForm :atendimento="atendimento" :loading="loading" />
    </Card>
    <Card>
      <DoctorFormReview :atendimento="atendimento" />
    </Card>

    <!-- <Card>
      <Stepper>
        <template v-slot="{ currentStep }">
          <StepperContent step="1" :current-step="currentStep">
            <AboutProfessionalForm
              :profissional="atendimento.profissional"
              :loading="loading"
            >
            </AboutProfessionalForm>
          </StepperContent>

          <StepperContent step="2" :current-step="currentStep">
            <AboutServiceForm :atendimento="atendimento" :loading="loading" />
          </StepperContent>
        </template>
      </Stepper>
    </Card> -->

    <!-- <pre>
      {{ atendimento }}
    </pre> -->

    <!-- <CardStepper v-model="currentStep" :steps="2" :current-step="currentStep">
      <template #step:1>
        <h3>{{ currentStep }}</h3>
        <AboutProfessionalForm @valid="currentStep = 2" />
      </template>
      <template #step:2 @valid="currentStep = 3">
        <h3>{{ currentStep }}</h3>
        <AboutServiceForm />
      </template>
    </CardStepper> -->
  </div>
</template>

<script>
import Card from "@/components/cards/Card.vue";

// import Stepper from "@/components/steppers/Stepper.vue";
// import StepperItems from "@/components/steppers/StepperItems.vue";
// import CardStepper from "@/components/steppers/CardStepper.vue";
// import StepperContent from "@/components/steppers/StepperContent.vue";
import AboutProfessionalForm from "./AboutProfessionalForm.vue";
import AboutServiceForm from "./AboutServiceForm.vue";
import DoctorFormReview from "./DoctorFormReview.vue";
import Atendimentos from "@/domain/models/atendimentos";

export default {
  components: {
    Card,
    // Stepper,
    // StepperItems,
    // StepperContent,
    // CardStepper,
    AboutProfessionalForm,
    AboutServiceForm,
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
    };
  },
  methods: {
    // initialState() {
    //   this.loading = true;
    //   setTimeout(() => {
    //     this.loading = false;
    //   }, 1000);
    // },
  },
};
</script>

<style>
</style>