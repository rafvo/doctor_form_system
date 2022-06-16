<template>
  <PopoverTooltip>
    <p>
      O campo <strong>"Número de Telefone ou Celular"</strong> aceita apenas números, e
      pode ter <code>10 dígitos (telefone) ou 11 digitos (celular)</code>
    </p>
  </PopoverTooltip>
</template>

<script>
import PopoverTooltip from "@/components/tooltips/PopoverTooltip.vue";

export default {
  components: {
    PopoverTooltip,
  },
};
</script>

<style>
</style>