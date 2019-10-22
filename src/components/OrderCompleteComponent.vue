<template>
  <div>{{name}}</div>
</template>


<script>
import { EventBus } from "../event-bus";
export default {
  data() {
      return {
          name: "Order Complete"
      }
  },
  created() {
      sessionStorage.clear();
  }
};
</script>

<style>

</style>