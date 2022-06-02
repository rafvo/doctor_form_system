<template>
  <div class="center-row-relative">
    <div class="center-row-absolute">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.center-row-relative {
    position: relative!important;
    height: 100%!important;
    width: 100%!important;
}    

.center-row-absolute {
  position: absolute!important;
  justify-content: center !important;
  top: 50%!important;
}

</style>