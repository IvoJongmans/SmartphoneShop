<template>
  <div class="col-sm-2">
    <div id="brandcontainer">
      <div
        v-for="brandInDatabase in brandsInDatabase"
        v-bind:key="brandInDatabase._id"
        class="form-check"
      >
        <input
          class="form-check-input"
          type="checkbox"
          v-bind:value="brandInDatabase.brand"
          :id="brandInDatabase.brand"
          v-model="search.brands"
          @change="searchData"
        />
        <label class="form-check-label" :for="brandInDatabase.brand">{{brandInDatabase.brand}}</label>
      </div>
    </div>
    <div>
      <input type="text" v-model="search.prices.priceMin" />
      <input type="text" v-model="search.prices.priceMax" />
      <button class="btn btn-primary" @click="searchData">>>></button>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../event-bus";

export default {
  data() {
    return {
      // brands: [],
      brandsInDatabase: [],
      search: {
        brands: [],
        prices: {
          priceMin: "",
          priceMax: ""
        }
      }
    };
  },
  created() {
    //gets all phonebrands from the database
    let uri = "http://localhost:4000/phones";

    let brandlist = [];
    this.axios.get(uri).then(response => {
      for (let i = 0; i < response.data.length; i++) {
        if (brandlist.includes(response.data[i].brand)) {
          console.log("Ik ken jou al!");
        } else {
          brandlist.push(response.data[i].brand);
          this.brandsInDatabase.push({ brand: response.data[i].brand });
        }
      }
    });
  },
  methods: {
    //emits all search options to IndexComponent
    searchData() {
      console.log(this.search)
      EventBus.$emit("searchData", this.search);
    }
  }
};
</script>

<style>
#brandcontainer {
  padding: 25px;
}
</style>