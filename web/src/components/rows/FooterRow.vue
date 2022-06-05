<template>
  <div class="footer-row">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variables/constants';

@media (max-width: $mobile_max_width) {
  .footer-row {
    position: fixed !important;
    left: 0!important;
    bottom: 0 !important;
    padding-bottom: 0 !important;
    margin-bottom: 0 !important;
    width: 100% !important;
  }
}
</style>