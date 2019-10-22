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
        class="phoneIndex"
        v-bind:id="phone._id"
        v-for="(phone, index) in filteredPhones"
        v-bind:key="phone._id"
        v-if="index < limit"
        style="padding: 15px"
      >
        <a v-bind:href="'/phone/' + phone._id">
          <img class="phoneIndexImage" v-bind:src="'/images/' + phone.image" />
          <p class="text-center" style="margin-top:16px">{{phone.brand}} {{phone.model}}</p>
          <p class="text-center">{{phone.price}},-</p>
        </a>
        <div class="text-center">
          <button
            class="btn btn-primary"
            v-bind:value="phone._id"
            @click="addToCart(phone)"
          >Add to Cart</button>
        </div>
      </div>
    </div>
    <div class="text-center" style="height:100px;" v-if="limit < phoneCount">
      <button class="btn btn-success" style="width:100%" @click="limit += 12">Show more..</button>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../event-bus";
import { filter } from "minimatch";

export default {
  data() {
    return {
      search: [],
      minPrice: null,
      maxPrice: null,
      phoneCount: 0,
      limit: 12,
      sortby: [],
      phones: []
    };
  },
  computed: {
    filteredPhones() {
      let phoneCount = 0
      return this.phones.filter(phone => {
        //select all phones when page is loaded (min-max prices are automatically 
        // set to 0 and 1200)
        if (
          this.search.length == 0 &&
          this.minPrice == null &&
          this.maxPrice == null
        ) {
          phoneCount += 1
          this.phoneCount = phoneCount
          return phone;
        } 
        //select all phones with corresponding selected brands and prices
        else if (this.search.some(el => phone.brand.includes(el)) &&
            (phone.price > this.minPrice) &&
            (phone.price < this.maxPrice)) {
              phoneCount += 1
          this.phoneCount = phoneCount
            return phone  
        }
        //select all phones with corresponding prices when no brands is selected
        else {
          if (
            this.search.length == 0 &&
            (phone.price > this.minPrice) &&
            (phone.price < this.maxPrice)
          ) {
            phoneCount += 1
          this.phoneCount = phoneCount
            return phone;
          }
        }
      });
    }
  },
  created() {
    //add all phones in DB to the page
    let uri = "http://localhost:4000/phones";
    this.axios.get(uri).then(response => {
      this.phones = response.data;
      // this.phoneCount = this.phones.length;
    });

    EventBus.$on("searchData", search => {
      this.search = search.brands;
      this.minPrice = search.prices.priceMin;
      this.maxPrice = search.prices.priceMax;
    });
  },
  methods: {
    //emits event to nav shopping cart
    addToCart(phone) {
      EventBus.$emit("addToCart", phone);
    },
    sortBy(criteria) {
      if (criteria == "brand") {
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
      if (criteria == "price") {
        this.phones.sort(function(a, b) {
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
  text-decoration: none;
}
.phoneIndex {
  width: auto;
}
.phoneIndex:hover {
  background-color: #f8f9fa;
}

.phoneIndexImage {
  max-height: 150px;
}
</style>