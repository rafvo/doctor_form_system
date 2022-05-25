<template>
  <div>
    <ValidationObserver ref="observer">
      <b-form @submit="insert">
        <b-row>
          <b-col>
            <FormTitle title="Sobre o profissional" />
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <FormSubtitle title="Dados do profissional" />
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <TextField
              v-model="profissionals.nome"
              label="Nome Completo"
              placeholder="Digite o nome completo"
              rules="required"
              required-label
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <CpfField
              v-model="profissionals.cpf"
              label="CPF"
              placeholder="Digite o CPF"
              rules="required"
              required-label
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <PhoneField
              v-model="profissionals.phone"
              label="Número de Telefone ou Celular"
              rules="required"
              required-label
              no-mask-result
              withDDD
            />
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            {{ profissionals }}
          </b-col>
        </b-row>
      </b-form>
    </ValidationObserver>
  </div>
</template>

<script>
import FormTitle from "@/components/typography/FormTitle.vue";
import FormSubtitle from "@/components/typography/FormSubtitle.vue";
import TextField from "@/components/fields/TextField.vue";
import CpfField from "@/components/fields/CpfField.vue";
import PhoneField from "@/components/fields/PhoneField.vue";
import Profissionais from "@/domain/models/profissionais";

export default {
  components: {
    FormTitle,
    FormSubtitle,
    TextField,
    CpfField,
    PhoneField,
  },
  props: {
    profissionals: {
      type: Object,
      default: () => new Profissionais(),
      required: false,
    },
  },
  methods: {
    insert() {
      console.log("inserting");
    },
  },
};
</script>

<style>
</style>