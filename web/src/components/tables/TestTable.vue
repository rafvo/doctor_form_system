<template>
  <div>
    <Card>
      <Datatable
        header-title="Lista de Usuários"
        :loading="loading"
        with-text-mark
        with-search
      />

      <ButtonGroupPagination :bind-value="1" :length="20" />
    </Card>
  </div>
</template>

<script>
import Card from "@/components/cards/Card.vue";
import Datatable from "@/components/tables/Datatable.vue";
import ButtonGroupPagination from "@/components/pagination/ButtonGroupPagination.vue";

export default {
  components: {
    Card,
    Datatable,
    ButtonGroupPagination,
  },
};
</script>

<style>
</style>