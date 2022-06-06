<template>
  <div>
    <template v-if="!existItems"> Nenhum registro </template>
    <template v-else>
      <b-table striped hover :items="items" :fields="fields">
        <template #cell(id)="data">
          {{ data.item.id }}
        </template>

        <template #cell(nome)="data">
          {{ data.item.nome }}
        </template>

        <template #cell(cpf)="data">
          {{ data.item.cpf | cpfcnpj }}
        </template>

        <template #cell(phone)="data">
          {{ data.item.phone | phoneCelphoneWithDDD }}
        </template>

        <template #cell(cidadeId)="data">
          <CityAndStateInformation :city-id="data.item.cidadeId" />
        </template>

        <template #cell()="data">
          <slot name="action" :item="data">
            <InlineRow>
              <IconButton icon="pencil" @click:prevent="edit(data.item)" />
              <IconButton
                class="ml-10"
                icon="trash2"
                @click:prevent="remove(data.item.id)"
              />
            </InlineRow>
          </slot>
        </template>
      </b-table>
    </template>
  </div>
</template>

<script>
import { exist } from "@/util/exist";
import InlineRow from "@/components/rows/InlineRow.vue";
import IconButton from "@/components/buttons/IconButton.vue";
import CityAndStateInformation from "@/components/info/CityAndStateInformation.vue";

export default {
  components: {
    InlineRow,
    IconButton,
    CityAndStateInformation,
  },
  computed: {
    fields() {
      return [
        { key: "id", label: "Id" },
        { key: "nome", label: "Nome" },
        { key: "cpf", label: "CPF" },
        { key: "phone", label: "Telefone/Celular" },
        { key: "cidadeId", label: "Cidade" },
        "Ações",
      ];
    },
    existItems() {
      return exist(this.items);
    },
    items() {
      return Object.values(this.$store.state.profissionais.data);
    },
  },
  methods: {
    edit(item) {
      this.$emit("edit", item);
    },
    remove(id) {
      this.loading = true;
      setTimeout(() => {
        this.$store.dispatch("profissionais/delete", id);
        this.$emit("removed", id);
        this.$toast.success("Removido com sucesso!", {
          timeout: 2000,
        });
        this.loading = false;
      }, 500);
    },
  },
};
</script>

<style>
</style>