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
          <div class="modal-body">
            <p v-for="phone in cart" v-bind:key="phone._id">{{phone}}</p>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Verder Winkelen</button>
            <button type="button" class="btn btn-success" data-dismiss="modal">Afrekenen</button>
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
      cart: []
    };
  },
  created() {
    EventBus.$on("addToCart", cart => {
      this.cart = cart;
    });
  },
  mounted() {
    $("#shoppingCart").click(function() {
      $("#myModal").modal("show");
    });
  }
};
</script>

<style>
</style>