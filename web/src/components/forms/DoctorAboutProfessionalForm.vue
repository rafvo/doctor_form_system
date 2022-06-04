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
            <b-col class="mb-3">
              <FormTitle title="Sobre o profissional" />
            </b-col>
          </b-row>

          <b-row class="mb-3">
            <b-col>
              <FormSubtitle title="Dados do profissional" />
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" xs="12" :md="fieldsGrid">
              <b-row>
                <b-col>
                  <TextField
                    v-model="profissional.nome"
                    :bind-value="profissional.nome"
                    label="Nome Completo"
                    placeholder="Digite o nome completo"
                    rules="required|min:3|max:48"
                    required-label
                  />
                </b-col>
              </b-row>

              <b-row :class="marginTopFields">
                <b-col>
                  <CpfField
                    v-model="profissional.cpf"
                    :bind-value="profissional.cpf"
                    label="CPF"
                    placeholder="Digite o CPF"
                    rules="required"
                    required-label
                    no-mask-result
                  />
                </b-col>
              </b-row>

              <b-row :class="marginTopFields">
                <b-col>
                  <PhoneField
                    v-model="profissional.phone"
                    :bind-value="profissional.phone"
                    label="Número de Telefone ou Celular"
                    rules="required"
                    required-label
                    no-mask-result
                    withDDD
                  />
                </b-col>
              </b-row>

              <b-row :class="marginTopFields">
                <b-col>
                  <CityDropdownField
                    v-model="profissional.cidadeId"
                    :city-id="profissional.cidadeId"
                    label="Cidade"
                    required
                    with-label
                    with-state-field
                    live-search
                  />
                </b-col>
              </b-row>

              <b-row>
                <b-col>
                  <slot name="submitButton"></slot>
                </b-col>
              </b-row>
            </b-col>

            <b-col cols="12" xs="12" :md="defaultExtraRowGrid">
              <slot name="extraRow"></slot>
            </b-col>
          </b-row>
        </b-form>
      </ValidationObserver>
    </template>
  </div>
</template>

<script>
import Profissionais from "@/domain/models/profissionais";
import SpinnerLoader from "@/components/loaders/SpinnerLoader.vue";
import FormTitle from "@/components/typography/FormTitle.vue";
import FormSubtitle from "@/components/typography/FormSubtitle.vue";
import TextField from "@/components/fields/TextField.vue";
import CpfField from "@/components/fields/CpfField.vue";
import PhoneField from "@/components/fields/PhoneField.vue";
import CityDropdownField from "@/components/fields/CityDropdownField.vue";

export default {
  components: {
    SpinnerLoader,
    FormTitle,
    FormSubtitle,
    TextField,
    CpfField,
    PhoneField,
    CityDropdownField,
  },
  props: {
    profissional: {
      type: Object,
      default: () => new Profissionais(),
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
    distanceFieldsInPixels: {
      type: [String, Number],
      default: 30,
      required: false,
    },
    extraRowGrid: {
      type: [String, Number],
      default: "12",
      required: false,
    },
  },
  computed: {
    maxGrid() {
      return 12;
    },
    defaultExtraRowGrid() {
      return this.extraRowGrid <= this.maxGrid ? this.extraRowGrid : this.maxGrid;
    },
    fieldsGrid() {
      return this.defaultExtraRowGrid < this.maxGrid
        ? this.maxGrid - this.defaultExtraRowGrid
        : this.maxGrid;
    },
    marginTopFields() {
      return this.distanceFieldsInPixels && this.distanceFieldsInPixels <= 200
        ? `mt-${this.distanceFieldsInPixels}`
        : 30;
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