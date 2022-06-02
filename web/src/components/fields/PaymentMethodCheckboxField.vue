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
          v-model="checked"
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
          return-object
          @oldList="emitOldList"
          @oldChecked="emitOldChecked"
          @input="emitInput"
        >
          <template slot="extra" slot-scope="{ item, index }">
            <template v-if="item.formaPagamentoId == 3">
              <InstallmentsRadioField
                :bind-value="item.parcelamentoEm"
                :total="item.formaPagamento.parcelamentoMaximo"
                :with-interest="item.formaPagamento.comJuros"
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
    setInstallmentNumber(payload, key) {
      if (this.checked && !this.checked[key]) return;
      this.checked[key].parcelamentoEm = payload;
      this.emitInput(this.checked);
    },
    emitOldList(payload) {
      this.$emit("oldList", payload);
    },
    emitOldChecked(payload) {
      this.$emit("oldChecked", Object.values(payload));
    },
    emitInput(payload) {
      this.$emit("input", Object.values(payload));
    },
  },
  mounted() {
    this.listModel = _cloneDeep(FormaPagamentoAtendimento.getAttendanceWithPaymentMethods());
  },
};
</script>

<style>
</style>