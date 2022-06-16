<template>
  <PopoverTooltip>
    <p>
      O campo "<strong>Nome completo</strong>" pode ter de
      <code>3 a 48 caracteres</code>.
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