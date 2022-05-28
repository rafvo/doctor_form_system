<template>
  <div>
    <SpinnerLoader v-if="loading" />
    <template v-else>
      <template v-if="existPaymentMethods">
        <InlineRow>
          <label
            v-if="withFieldLabel"
            class="white-space-nowrap cursor-pointer mr-7"
            :class="{ required: requiredList }"
            >{{ fieldLabel }}</label
          >
        </InlineRow>
        <ValidationProvider
          v-slot="{ errors }"
          :name="fieldLabel"
          :rules="requiredListRule"
        >
          <CheckboxListField
            v-model="checked"
            :options="listModel"
            :rules="requiredItemsRule"
            bind-value-prop="formaPagamentoId"
            checked-value-prop="formaPagamento.id"
            checked-label-prop="formaPagamento.nome"
            unchecked-value-prop=""
            unchecked-label-prop="formaPagamento.nome"
            return-object
            @oldList="emitOldList"
            @oldChecked="emitOldChecked"
            @input="emitInput"
          >
            <template slot="extra" slot-scope="{ item, index }">
              <template v-if="item.formaPagamentoId == 3">
                <InstallmentsRadioField
                  :total="item.formaPagamento.parcelamentoMaximo"
                  :with-interest="item.formaPagamento.comJuros"
                  rules="required"
                  @input="setInstallmentNumber($event, index)"
                />
              </template>
            </template>
          </CheckboxListField>
          <VeeValidateErrorMessage :vv-errors="errors" />
        </ValidationProvider>
      </template>
      <template v-else>
        <div class="row px-20">
          <div class="col-md-12">
            <div class="alert alert-primary">Nenhum registro encontrado</div>
          </div>
        </div>
      </template>
    </template>
    <pre>
      {{ checked }}
    </pre>
  </div>
</template>

<script>
// import { exist } from "@/util/exist";
// import _cloneDeep from "lodash/cloneDeep";
import SpinnerLoader from "@/components/loaders/SpinnerLoader.vue";
import InlineRow from "@/components/rows/InlineRow.vue";
import CheckboxListField from "./CheckboxListField.vue";
import InstallmentsRadioField from "./InstallmentsRadioField.vue";
import VeeValidateErrorMessage from "@/components/veeValidate/VeeValidateErrorMessage";
import FormaPagamentoAtendimento from "@/domain/models/formaPagamentoAtendimento";

export default {
  components: {
    SpinnerLoader,
    InlineRow,
    CheckboxListField,
    InstallmentsRadioField,
    VeeValidateErrorMessage,
  },
  props: {
    workerId: {
      type: [String, Number],
      default: null,
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
    existPaymentMethods() {
      return true; //Boolean(exist(this.paymentMethods));
    },
    // paymentMethods() {
    //   return Object.values(this.$store.state.hability.all);
    // },
    defaultChecked() {
      return Object.values(this.checked);
    },
    requiredListRule() {
      return this.requiredList ? "required" : "";
    },
    requiredItemsRule() {
      return this.requiredItems ? "required" : "";
    },
  },
  methods: {
    getAttendanceWithPaymentMethods() {
      this.loading = true;
      setTimeout(() => {
        this.listModel =
          FormaPagamentoAtendimento.getAttendanceWithPaymentMethods();
        this.loading = false;
      }, 1000);

      // this.$store
      //   .dispatch("hability/getHabilityWorker", this.workerId)
      //   .then((data) => {
      //     this.listModel = data;

      //     this.loading = false;
      //   })
      //   .catch((error) => {
      //     this.loading = false;
      //   });
    },
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
    this.getAttendanceWithPaymentMethods();
  },
};
</script>

<style>
</style>

<!--
             <CheckboxListField
            v-model="checked"
            :default-checked="defaultChecked"
            :default-list="listModel"
            :false-value="null"
            :rules="requiredItemsRule"
            default-value-key-prop="id_hability"
            true-label-key-prop="name"
            false-label-key-prop="name"
            field-label-prop="name"
            true-value-key-prop="id"
            true-value-in-list
            field-label-in-list
            emit-checked-object
            @oldList="emitOldList"
            @oldChecked="emitOldChecked"
            @input="emitInput"
          >-->
            <!-- <template slot="extra" slot-scope="{ item, index }">
              <div class="row">
                <div class="col-md-5">
                  <text-field-a
                    :default-value="item.grade"
                    v-model="listModel[index].grade"
                    :field-readonly="readonlyGrade(index)"
                    :reset="resetGrade(index)"
                    :focus="!readonlyGrade(index)"
                    placeholder="0 a 10 (Nota)"
                    label="Nota da Habilidade"
                    rules="numeric|max:2|max_value:10"
                    @input="setGrade($event, index)"
                  />
                </div>
              </div>
            </template> -->