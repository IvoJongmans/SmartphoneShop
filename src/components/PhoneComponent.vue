<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-6">
        <h1>{{phone.brand}}</h1>
        <h3>{{phone.model}}</h3>
        <h5>Prijs: {{phone.price}},-</h5>
        <p>{{phone.description}}</p>
      </div>

      <div class="col-sm-6 text-center">
        <img v-bind:src="'/images/' + phone.image" style="padding:17px" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: {}
    };
  },
  created() {
    var id = this.$route.params.id;
    let uri = `http://localhost:4000/phones/${id}`;
    this.axios.get(uri).then(response => {
      this.phone = response.data;
    });
  }
};
</script>

<style>

</style>