<template>
  <div class="home">
    <DoctorTabStepForm />
  </div>
</template>

<script>
import DoctorTabStepForm from "@/components/forms/DoctorTabStepForm.vue";
// import DoctorStepForm from "@/components/forms/DoctorStepForm.vue";

export default {
  name: "Home",
  components: {
    DoctorTabStepForm,
    //DoctorStepForm,
  },
};
</script>
