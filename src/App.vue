<template>
  <div class="container-fluid">
    <router-view name="nav"></router-view>

    <div id="vue-group" class="container-fluid">
      <div class="row">
        <router-view name="search"></router-view>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style>
</style>


<script>
export default {
  
};
</script>

<style>
</style>