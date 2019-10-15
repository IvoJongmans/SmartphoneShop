<template>
  <div class="col-sm-10">
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
      phones: [],
      cart: []
    };
  },
  created() {
    let uri = "http://localhost:4000/phones";
    this.axios.get(uri).then(response => {
      this.phones = response.data;
    });
    EventBus.$on("searchData", brands => {
      let uri = "http://localhost:4000/search?";

      if (brands.length == 0) {
        let uri = "http://localhost:4000/phones";
        this.axios.get(uri).then(response => {
          this.phones = response.data;
        });
      } else {
        for (let i = 0; i < brands.length; i++) {
          if (i == brands.length - 1) {
            uri += "brand=" + brands[i];
          } else {
            uri += "brand=" + brands[i] + "&";
          }
        }
        this.axios.get(uri).then(response => {
          this.phones = response.data;
        });
      }
    });
  },
  methods: {
    addToCart(phone) {
      this.cart.push(phone);
      EventBus.$emit("addToCart", this.cart);
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