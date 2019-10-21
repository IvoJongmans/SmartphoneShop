<template>
  <div class="col-sm-2">
    <div id="brandcontainer">
      <h3>Brand:</h3>
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
    <div id="pricecontainer">
      <h3>Price:</h3>
      <input class="form-control" type="text" v-model="search.prices.priceMin" />
      <input class="form-control" type="text" v-model="search.prices.priceMax" />
      <button class="btn btn-primary form-control" @click="searchData">>>></button>
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
          priceMin: "0",
          priceMax: "1200"
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
      EventBus.$emit("searchData", this.search);
    }
  }
};
</script>

<style>
#brandcontainer, #pricecontainer {
  padding: 25px;
}
</style>