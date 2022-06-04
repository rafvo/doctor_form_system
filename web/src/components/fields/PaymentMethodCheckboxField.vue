<template>
  <div>
    <SpinnerLoader
      v-if="loading"
      width="1.5rem"
      height="1.5rem"
      justify-content="left"
      loading-text="Carregando Opções..."
      with-loading-text
      small
    />
    <template v-else-if="existListModel">
      <ValidationProvider
        v-slot="{ errors }"
        :name="fieldLabel"
        :rules="requiredListRule"
      >
        <CheckboxListField
          v-model="Checked"
          :default-checked="defaultChecked"
          :options="listModel"
          :rules="requiredItemsRule"
          :field-label="fieldLabel"
          :requiredLabel="requiredList"
          bind-value-prop="formaPagamentoId"
          checked-value-prop="formaPagamento.id"
          checked-label-prop="formaPagamento.nome"
          unchecked-value-prop=""
          unchecked-label-prop="formaPagamento.nome"
          :with-field-label="withFieldLabel"
          card-checkbox
          return-object
        >
          <template slot-scope="{ checkedBindValue, checked, index }">
            <template v-if="checkedBindValue == 3">
              <InstallmentsRadioField
                :bind-value="checked.parcelamentoEm"
                :total="checked.formaPagamento.parcelamentoMaximo"
                :with-interest="checked.formaPagamento.comJuros"
                rules="required"
                with-field-label
                @input="setInstallmentNumber($event, index)"
              />
            </template>
          </template>
        </CheckboxListField>
        <VeeValidateErrorMessage :vv-errors="errors" />
      </ValidationProvider>
    </template>
    <template v-else> Nenhum registro encontrado </template>
  </div>
</template>

<script>
import { exist } from "@/util/exist";
import _cloneDeep from "lodash/cloneDeep";
import SpinnerLoader from "@/components/loaders/SpinnerLoader.vue";
import CheckboxListField from "./CheckboxListField.vue";
import InstallmentsRadioField from "./InstallmentsRadioField.vue";
import VeeValidateErrorMessage from "@/components/veeValidate/VeeValidateErrorMessage";
import FormaPagamentoAtendimento from "@/domain/models/formaPagamentoAtendimento";

export default {
  components: {
    SpinnerLoader,
    CheckboxListField,
    InstallmentsRadioField,
    VeeValidateErrorMessage,
  },
  props: {
    defaultChecked: {
      type: Array,
      default: () => [],
      required: false,
    },
    fieldLabel: {
      type: String,
      default: "Formas de pagamento da consulta",
      required: false,
    },
    requiredList: {
      type: Boolean,
      default: false,
      required: false,
    },
    requiredItems: {
      type: Boolean,
      default: false,
      required: false,
    },
    withFieldLabel: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      loading: false,
      listModel: [],
      checked: {},
    };
  },
  computed: {
    Checked: {
      get() {
        return this.checked;
      },
      set(obj) {
        this.checked = obj;
        this.emitInput();
      },
    },
    existListModel() {
      return exist(this.listModel);
    },
    requiredListRule() {
      return this.requiredList ? "required" : "";
    },
    requiredItemsRule() {
      return this.requiredItems ? "required" : "";
    },
  },
  methods: {
    setCheckedObject(payload) {
      this.checkedObject = payload;
    },
    existChecked(key) {
      return this.checked && this.checked[key];
    },
    setInstallmentNumber(value, key) {
      if (!this.existChecked) return;
      this.checked[key].parcelamentoEm = value;
      this.emitInput();
    },
    resetInstallment(key) {
      if (!this.existChecked) return;
      this.checked[key].parcelamentoEm = null;
      this.emitInput();
    },
    emitInput() {
      this.$emit("input", Object.values(this.checked));
    },
  },
  created() {
    this.listModel = _cloneDeep(
      FormaPagamentoAtendimento.getAttendanceWithPaymentMethods()
    );
  },
};
</script>

<style>
</style>