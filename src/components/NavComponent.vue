<template>
  <div id="navcontainer">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">
        <img src="/images/navbrand.png" width="40" height="40" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/"></a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <img src="/images/shoppingcart.png" width="40" height="40" id="shoppingCart" />
          <span class="badge badge-secondary">{{cart.length}}</span>
        </form>
      </div>
    </nav>

    <div class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Shopping Cart</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body container" v-if="cart.length > 0">
            <div
              v-for="(phone, index) in cart"
              v-bind:key="phone._id"
              class="row"
              style="padding:5px;"
            >
              <div class="col-sm-8">
                <img v-bind:src="'/images/' + phone.image" style="height:30px;width:30px" />
                {{phone.brand}} {{phone.model}} {{phone.price}},-
              </div>

              <div class="col-sm-4 text-right">
                <button class="btn btn-danger" @click="removeFromCart(index)">X</button>
              </div>
            </div>
            <hr />
            <p class="text-right" style="margin-bottom:0px;">Totaal: {{totalPrice}},-</p>
          </div>
          <div class="modal-body container" v-else>
            <p style="margin-bottom:0px;">Empty:( Add items to shoppingcart.</p>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer" v-if="cart.length > 0">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Continue shopping</button>
            <a href="/checkout">
              <button type="button" class="btn btn-success">Checkout</button>
            </a>
          </div>
          <div class="modal-footer" v-else>
            <button type="button" class="btn btn-primary" data-dismiss="modal">Continue shopping</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../event-bus";
export default {
  data() {
    return {
      cart: [],
      totalPrice: 0
    };
  },
  created() {
    //check for session -> yes -> add phones to cart
    if (sessionStorage.length > 0) {
      this.cart = JSON.parse(sessionStorage.getItem("cart"));
    }
    //on addToCart add phone to cart
    EventBus.$on("addToCart", phone => {
      this.cart.push(phone);
      sessionStorage.setItem("cart", JSON.stringify(this.cart));
    });
  },
  mounted() {
    //opens the shopping cart model when clicking on #shoppingcart image
    $("#shoppingCart").click(function() {
      $("#myModal").modal("show");
    });
  },
  methods: {
    //removes phone from cart on index
    removeFromCart(indexToRemove) {
      this.cart.splice(indexToRemove, 1);
      EventBus.$emit("updateCheckout", this.cart);
      sessionStorage.setItem("cart", JSON.stringify(this.cart));
    }
  },
  watch: {
    //watch cart for change
    cart: function() {
      let total = 0;
      //@change update total price
      for (let i = 0; i < this.cart.length; i++) {
        total += parseInt(this.cart[i].price);
      }
      this.totalPrice = total;
    }
  }
};
</script>

<style>
</style>