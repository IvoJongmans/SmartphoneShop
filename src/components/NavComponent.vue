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

        
          
          <!-- <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
          </li>-->
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <!-- <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
          <img src="/images/shoppingcart.png" width="40" height="40" id="shoppingCart" @click="openModal">
        </form>
      </div>
    </nav>

    <div class="modal" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title">Modal Heading</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
        Modal body..
      </div>

      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
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
      }
    },
    created() {

      //adds phones to cart array
      EventBus.$on("addToCart", phone => {
      this.cart.push({"phone" : phone})
      console.log(this.cart)
    });
    
    },
    methods: {
      openModal() {
        console.log("show shopping cart")
      }
    }
}
</script>

<style>

</style>