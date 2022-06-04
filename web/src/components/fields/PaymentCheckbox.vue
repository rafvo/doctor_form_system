<template>
  <div>
    <CheckboxSelection
      :bindValue="bindValue"
      :options="options"
      :bindValueField="bindValueField"
      :valueField="valueField"
      :textField="textField"
      :rules="rules"
      :fieldLabel="fieldLabel"
      :requiredLabel="requiredLabel"
      :withFieldLabel="withFieldLabel"
      card-checkbox
      return-object
    >
      <!--  @unchecked="(key) => key == 3 && resetInstallment(key)" -->
      <!-- <template slot-scope="{ checkedBindValue, checked, index }">
        <template v-if="checkedBindValue == 3">
          {{ checked }}
          <InstallmentsRadioField
            :bind-value="checked.parcelamentoEm"
            :total="checked.formaPagamento.parcelamentoMaximo"
            :with-interest="checked.formaPagamento.comJuros"
            rules="required"
            with-field-label
            @input="setInstallmentNumber($event, index)"
          />
        </template>
      </template> -->
    </CheckboxSelection>
  </div>
</template>

<script>
import Atendimentos from "@/domain/models/atendimentos";
import FormasPagamento from "@/domain/models/formasPagamento";
import CheckboxSelection from "./CheckboxSelection.vue";
// import InstallmentsRadioField from "./InstallmentsRadioField.vue";

export default {
  components: {
    CheckboxSelection,
    //InstallmentsRadioField,
  },
  props: {
    bindValue: {
      type: Array,
      default: () => [],
      required: false,
    },
    options: {
      type: Array,
      default: () => [
        {
          atendimentoId: null,
          formaPagamentoId: null,
          parcelamentoEm: null,
          atendimento: new Atendimentos(),
          formaPagamento: new FormasPagamento({
            id: 1,
            nome: "Pix",
            temParcelas: false,
            comJuros: false,
          }),
        },
        {
          atendimentoId: null,
          formaPagamentoId: null,
          parcelamentoEm: null,
          atendimento: new Atendimentos(),
          formaPagamento: new FormasPagamento({
            id: 2,
            nome: "Em dinheiro",
            temParcelas: false,
            comJuros: false,
          }),
        },
        {
          atendimentoId: null,
          formaPagamentoId: null,
          parcelamentoEm: null,
          atendimento: new Atendimentos(),
          formaPagamento: new FormasPagamento({
            id: 3,
            nome: "Cartão de crédito",
            temParcelas: true,
            comJuros: false,
            parcelamentoMaximo: 3,
          }),
        },
      ],
      required: false,
    },
    bindValueField: {
      type: String,
      default: "formaPagamentoId",
      required: false,
    },
    valueField: {
      type: String,
      default: "formaPagamento.id",
      required: false,
    },
    textField: {
      type: String,
      default: "formaPagamento.nome",
      required: false,
    },
    rules: {
      type: String,
      default: "",
      required: false,
    },
    fieldLabel: {
      type: String,
      default: "Formas de pagamento da consulta",
      required: false,
    },
    requiredLabel: {
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
  },
  methods: {
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
      console.log(this.checked[key]);
      this.emitInput();
    },
    emitInput() {
      this.$emit("input", Object.values(this.checked));
    },
  },
};
</script>

<style>
</style>