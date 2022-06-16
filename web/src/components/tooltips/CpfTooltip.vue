<template>
  <PopoverTooltip>
    <p>
      O campo "<strong>CPF</strong>" deve seguir o formato
      <code>000.000.000-00</code>, exemplo: <code>239.681.080-43</code>.
    </p>
    <p>
      Caso o CPF já esteja cadastrado, será mostrada a mensagem de erro
      "<strong>CPF já cadastrado</strong>" no campo.
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