<template>
  <div class="col-sm-10">
    <div>
      Sort by:
      <select
        class="custom-select"
        id="sortby"
        name="sortby"
        v-model="sortby"
        @change="sortBy(sortby)"
      >
        <option value="price">Price</option>
        <option value="brand">Brand</option>
      </select>
    </div>
    <div class="d-flex flex-wrap">
      <div
        class="text-center phoneIndex"
        v-bind:id="phone._id"
        v-for="phone in phones"
        v-bind:key="phone._id"
        style="padding: 15px"
      >
        <a v-bind:href="'/phone/' + phone._id">
          <img v-bind:src="'/images/' + phone.image" />
          <br />
          {{phone.brand}}
          <br />
          {{phone.model}}
          <br />
          Prijs: {{phone.price}},-
        </a>
        <br />
        <button
          class="btn btn-primary"
          v-bind:value="phone._id"
          @click="addToCart(phone)"
        >Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../event-bus";

export default {
  data() {
    return {
      sortby: [],
      phones: []
    };
  },
  created() {
    //add all phones in DB to the page
    let uri = "http://localhost:4000/phones";
    this.axios.get(uri).then(response => {
      this.phones = response.data;
    });
    //search on phone brands
    EventBus.$on("searchData", search => {
      //when no brand / price is selected show all phones again
      if (
        search.brands.length == 0 &&
        search.prices.priceMin === "" &&
        search.prices.priceMax === ""
      ) {
        let uri = "http://localhost:4000/phones";
        this.axios.get(uri).then(response => {
          this.phones = response.data;
          //if sortby has a value (e.g. "price") the phones will be loaded according to the sort criteria
          this.sortBy(this.sortby);
        });
      }
      //show brands that are selected
      else {
        let uri = "http://localhost:4000/search?";
        if (search.brands.length > 0) {
          for (let i = 0; i < search.brands.length; i++) {
            if (i == search.brands.length - 1) {
              uri += "brand=" + search.brands[i];
            } else {
              uri += "brand=" + search.brands[i] + "&";
            }
          }
        }
        if (search.prices.priceMin !== "") {
          if (uri.slice(-1) == "?") {
            uri += "priceMin=" + search.prices.priceMin;
          } else {
            uri += "&priceMin=" + search.prices.priceMin;
          }
        }
        if (search.prices.priceMax !== "") {
          if (uri.slice(-1) == "?") {
            uri += "priceMax=" + search.prices.priceMax;
          } else {
            uri += "&priceMax=" + search.prices.priceMax;
          }
        }
        
        this.axios.get(uri).then(response => {
          this.phones = response.data;
          //if sortby has a value (e.g. "price") the phones will be loaded according to the sort criteria
          this.sortBy(this.sortby);
        });
      }
      
    });
  },
  methods: {
    //emits event to nav shopping cart
    addToCart(phone) {
      EventBus.$emit("addToCart", phone);
    },
    sortBy(criteria) {
      console.log(criteria)
      if(criteria == "brand"){
      this.phones.sort(function(a, b) {
        var brandA = a.brand.toUpperCase(); // ignore upper and lowercase
        var brandB = b.brand.toUpperCase(); // ignore upper and lowercase
        if (brandA < brandB) {
          return -1;
        }
        if (brandA > brandB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    }
    if(criteria == "price") {
      console.log("ik kom bij price uit")
      this.phones.sort(function (a, b) {
      return a.price - b.price;
});
    }
    }
  },
  mounted() {}
};
</script>

<style>
a {
  color: black;
}

a:hover {
  color: black;
}

.phoneIndex:hover {
  background-color: #f8f9fa;
}
</style>