<template>
  <div>
      checkout
  </div>
</template>


<script>
export default {
    data() {
      return {
        phones: []
      }
    },
    created() {
      this.phones = JSON.parse(sessionStorage.getItem("cart"));
    }
}
</script>

<style>

</style>