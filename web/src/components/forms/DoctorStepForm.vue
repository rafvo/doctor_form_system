<template>
  <div>
    <Stepper v-model="currentStep" show-only-one>
      <StepperContent step="1">
        <Card centered>
          <!-- <AboutProfessionalForm
            @valid="currentStep = 2"
            :profissional="atendimento.profissional"
            :loading="loading" 
          > -->
          <!-- </AboutProfessionalForm> -->
          <AboutServiceForm :atendimento="atendimento" :loading="loading" />
        </Card>
      </StepperContent>

      <StepperContent step="2">
        <AboutServiceForm :atendimento="atendimento" :loading="loading" />
      </StepperContent>

      <!-- <StepperItems></StepperItems> -->
    </Stepper>

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

import Stepper from "@/components/steppers/Stepper.vue";
// import StepperItems from "@/components/steppers/StepperItems.vue";
// import CardStepper from "@/components/steppers/CardStepper.vue";
import StepperContent from "@/components/steppers/StepperContent.vue";
// import AboutProfessionalForm from "./AboutProfessionalForm.vue";
import AboutServiceForm from "./AboutServiceForm.vue";
import Atendimentos from "@/domain/models/atendimentos";

export default {
  components: {
    Card,
    Stepper,
    // StepperItems,
    StepperContent,
    // CardStepper,
    // AboutProfessionalForm,
    AboutServiceForm,
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
      currentStep: 1,
    };
  },
  methods: {
    initialState() {
      //this.loading = true;
      // setTimeout(() => {
      //   this.loading = false;
      // }, 1000);
    },
  },
  created() {
    this.initialState();
  },
};
</script>

<style>
</style>