<template>
  <div>
    <b-row v-if="withFieldLabel">
      <b-col>
        <FieldLabel :label="fieldLabel" :required="requiredLabel" />
      </b-col>
    </b-row>
    <!-- <ValidationProvider v-slot="{ errors }" :name="fieldLabel" :rules="rules"> -->
      <b-row v-for="(obj, key) in clonedOptions" :key="key">
        <b-col>
          <b-card
            class="text-left"
            :style="{
              visibility: cardCheckbox ? 'visible' : 'hidden',
            }"
          >
            <div class="checkbox-content">
              <b-form-checkbox
                
                :value="keyValue(obj)"
                @input="add($event, key)"
              >
                <span class="ml-5">{{ keyText(obj) }}</span>
              </b-form-checkbox>

              <!-- <slot
                :option="obj"
                :index="keyValue(obj)"
                :bindValueField="keyBindValue(obj)"
                :checked="checked[keyValue(obj)]"
                :checkedBindValue="keyBindValueChecked(keyValue(obj))"
              ></slot> -->
            </div>
          </b-card>
        </b-col>
      </b-row>
      <!-- <VeeValidateErrorMessage :vv-errors="errors" />
    </ValidationProvider> -->
  </div>
</template>

<script>
import Vue from "vue";
import _cloneDeep from "lodash/cloneDeep";
// import { exist } from "@/util/exist";
import { getObjValue, assign } from "@/util/objects";
import FieldLabel from "@/components/label/FieldLabel.vue";
//import VeeValidateErrorMessage from "@/components/veeValidate/VeeValidateErrorMessage.vue";

export default {
  components: {
    FieldLabel,
    //VeeValidateErrorMessage,
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
        { id: 1, opcaoId: null, text: "Opção Exemplo 1" },
        { id: 2, opcaoId: null, text: "Opção Exemplo 2" },
      ],
      required: false,
    },
    returnObject: {
      type: Boolean,
      default: false,
      required: false,
    },
    /*setar esta prop com o resultado de { valueField } - opcional*/
    bindValueField: {
      type: String,
      default: "opcaoId",
      required: false,
    },
    valueField: {
      type: String,
      default: "id",
      required: false,
    },
    textField: {
      type: String,
      default: "text",
      required: false,
    },
    cardCheckbox: {
      type: Boolean,
      default: false,
      required: false,
    },
    rules: {
      type: String,
      default: "",
      required: false,
    },
    fieldLabel: {
      type: String,
      default: "{Campo}",
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
      field: null,
      clonedBindValue: [],
      clonedOptions: [],
      selected: [],
      checked: {},
    };
  },
  computed: {
    Selected: {
      get() {
        return this.selected;
      },
      set(arr) {
        console.log("computed selected");
        //this.unchecked(arr);
        this.selected = arr;
        this.Checked = this.selectedObjects();
      },
    },
    Checked: {
      get() {
        return this.checked;
      },
      set(obj) {
        this.checked = obj;
        this.emitInput();
      },
    },
    objectOptions() {
      return this.options.reduce((acc, obj) => {
        Vue.set(acc, this.keyValue(obj), obj);
        return acc;
      }, {});
    },
  },
  methods: {
    unchecked(arr) {
      const value = this.selected.filter((e) => !arr.includes(e)).shift();
      value && this.emitUnchecked(value);
    },
    existBindValueFieldProp(obj) {
      try {
        if (!this.bindValueField) return false;
        return this.keyBindValue(obj) !== undefined;
      } catch (error) {
        return false;
      }
    },
    keyBindValue(obj) {
      return getObjValue(obj, { key: this.bindValueField });
    },
    keyValue(obj) {
      return getObjValue(obj, { key: this.valueField });
    },
    keyText(obj) {
      return getObjValue(obj, { key: this.textField });
    },
    existCheckedObj(index) {
      return this.checked && this.checked[index];
    },
    keyBindValueChecked(index) {
      if (!this.existCheckedObj(index)) return null;
      return this.keyBindValue(this.checked[index]);
    },
    bindValueChecked() {
      return this.bindValue.reduce((acc, obj) => {
        Vue.set(acc, this.keyValue(obj), obj);
        return acc;
      }, {});
    },
    bindValueKeys() {
      return this.bindValue.reduce((acc, obj) => {
        acc.push(this.keyValue(obj));
        return acc;
      }, []);
    },
    checkedKeys() {
      let arr = _cloneDeep(Object.values(this.checked));
      return arr.reduce((acc, obj) => {
        acc.push(this.keyValue(obj));
        return acc;
      }, []);
    },
    selectedObjects() {
      let arr = _cloneDeep(this.selected);
      return arr.reduce((acc, value) => {
        Vue.set(acc, value, this.objectOptions[value]);
        if (this.existBindValueFieldProp(acc[value]))
          assign(acc[value], this.bindValueField, this.keyValue(acc[value]));
        return acc;
      }, {});
    },
    emitInput() {
      this.$emit(
        "input",
        this.returnObject ? this.checked : Object.values(this.checked)
      );
    },
    emitUnchecked(value) {
      this.$emit("unchecked", value);
    },
  },
  created() {
    this.checked = _cloneDeep(this.bindValueChecked());
    this.selected = _cloneDeep(this.checkedKeys());
  },
  mounted() {
    this.clonedOptions = _cloneDeep(this.options);
  },
};
</script>

<style scoped>
.card {
  background: #fafafa;
  border-radius: 9px;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1);
}

.card .card-body > .checkbox-content {
  visibility: visible !important;
}
</style>

<!-- 

   <b-form-checkbox-group
      v-model="Selected"
      :options="options"
      :value-field="valueField"
      :text-field="textField"
    ></b-form-checkbox-group> 

// options: [
      //   { item: "A", name: "Option A" },
      //   { item: "B", name: "Option B" },
      //   { item: "D", name: "Option C", notEnabled: true },
      //   { item: { d: 1 }, name: "Option D" },
      // ],
      // options: {
      //   1: {
      //     atendimentoId: null,
      //     formaPagamentoId: null,
      //     parcelamentoEm: null,
      //     atendimento: new Atendimentos(),
      //     formaPagamento: new FormasPagamento({
      //       id: 1,
      //       nome: "Pix",
      //       temParcelas: false,
      //       comJuros: false,
      //     }),
      //   },
      //   2: {
      //     atendimentoId: null,
      //     formaPagamentoId: null,
      //     parcelamentoEm: null,
      //     atendimento: new Atendimentos(),
      //     formaPagamento: new FormasPagamento({
      //       id: 2,
      //       nome: "Em dinheiro",
      //       temParcelas: false,
      //       comJuros: false,
      //     }),
      //   },
      //   3: {
      //     atendimentoId: null,
      //     formaPagamentoId: null,
      //     parcelamentoEm: null,
      //     atendimento: new Atendimentos(),
      //     formaPagamento: new FormasPagamento({
      //       id: 3,
      //       nome: "Cartão de crédito",
      //       temParcelas: true,
      //       comJuros: false,
      //       parcelamentoMaximo: 3,
      //     }),
      //   },
      //},
      
// add(formaPagamentoId) {
    //   const value = _cloneDeep(this.options[formaPagamentoId]);
    //   Vue.set(this.checked, formaPagamentoId, value);
    // },

<b-form-group
      label="Individual stacked checkboxes (default)"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-checkbox
        v-for="option in listOptions"
        v-model="selected"
        :key="option.formaPagamento.id"
        :value="option.formaPagamento.id"
        :aria-describedby="ariaDescribedby"
        @input="add($event, option.formaPagamento.id)"
      >
        {{ option.formaPagamento.nome }}
      </b-form-checkbox>
    </b-form-group> -->

    <!-- <b-row v-for="option in listOptions" :key="option.formaPagamento.id">
      <b-col>
        <b-form-checkbox
          v-model="Field"
          :value="option.formaPagamento.id"
          @input="add($event, option.formaPagamento.id)"
        >
          {{ option.formaPagamento.nome }}
        </b-form-checkbox>
      </b-col>
    </b-row> 
selectedObjects() {
      const obj = {};
      for (const key in this.selected) {
        const index = this.selected[key];
        Vue.set(obj, index, this.options[index]);
      }
      return obj;
    },


  -->