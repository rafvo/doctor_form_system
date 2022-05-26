<template>
  <div>
    <SpinnerLoader
      v-if="loading"
      width="3rem"
      height="3rem"
      justify-content="center"
    />
    <template v-else>
      <ValidationObserver ref="observer">
        <b-form>
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

          <b-row class="mt-3">
            <b-col>
              <SpecialtyDropdownField
                v-model="atendimento.profissional.especialidadeId"
                :bind-value="atendimento.profissional.especialidadeId"
                label="Especialidade principal"
                required
                with-label
                live-search
              />
            </b-col>
          </b-row>

          {{ atendimento }}

          <b-row>
            <b-col>
              <MoneyField
                v-model="atendimento.preco"
                :bind-value="atendimento.preco"
                label="Preço"
                rules="required_money"
                required-label
                with-label
              />
            </b-col>
          </b-row>
        </b-form>
      </ValidationObserver>
    </template>
  </div>
</template>

<script>
import SpinnerLoader from "@/components/loaders/SpinnerLoader.vue";
import FormTitle from "@/components/typography/FormTitle.vue";
import FormSubtitle from "@/components/typography/FormSubtitle.vue";
import SpecialtyDropdownField from "@/components/fields/SpecialtyDropdownField.vue";
import MoneyField from "@/components/fields/MoneyField.vue";
import Atendimentos from "@/domain/models/atendimentos";

export default {
  components: {
    SpinnerLoader,
    FormTitle,
    FormSubtitle,
    SpecialtyDropdownField,
    MoneyField,
  },
  props: {
    atendimento: {
      type: Object,
      default: () => new Atendimentos(),
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
      required: false
    }
  },
};
</script>

<style>
</style>