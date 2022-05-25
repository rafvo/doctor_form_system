<template>
  <div>
    <b-row>
      <b-col>
        <FormTitle title="Sobre o atendimento" />
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <FormSubtitle title="Detalhes do atendimento" />
      </b-col>
    </b-row>

    <b-row>
      <b-col> </b-col>
    </b-row>
  </div>
</template>

<script>
import FormTitle from "@/components/typography/FormTitle.vue";
import FormSubtitle from "@/components/typography/FormSubtitle.vue";

export default {
  components: {
    FormTitle,
    FormSubtitle
  },
};
</script>

<style>
</style>