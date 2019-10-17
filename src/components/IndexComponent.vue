<template>
  <div class="col-sm-10">
    <div class="d-flex flex-wrap justify-content-between">
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
      phones: [],
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
      if (search.brands.length == 0 && search.prices.priceMin === ""  && search.prices.priceMax === "") {
        let uri = "http://localhost:4000/phones";
        this.axios.get(uri).then(response => {
          this.phones = response.data;
        });
      } 
      //show brands that are selected
      else {
        let uri = "http://localhost:4000/search?";
        for (let i = 0; i < search.brands.length; i++) {
          if (i == search.brands.length - 1) {
            uri += "brand=" + search.brands[i];
          } else {
            uri += "brand=" + search.brands[i] + "&";
          }
        }
        this.axios.get(uri).then(response => {
          this.phones = response.data;
        });
      }
    });
  },
  methods: {
    //emits event to nav shopping cart 
    addToCart(phone) {
      EventBus.$emit("addToCart", phone)
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