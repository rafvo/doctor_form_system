<template>
  <PopoverTooltip>
    <p>
      O campo <strong>"Número de celular"</strong> deve aceitar só números, e
      deve ter <code>11 dígitos</code>. E deve seguir o formato
      <code>(00) 0 0000-0000</code>, exemplo: <code>(51) 9 2253-8347</code>.
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