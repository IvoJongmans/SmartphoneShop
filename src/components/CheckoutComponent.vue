<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-6">
        <h3>Shipping information:</h3>
        <form>
          <div class="row">
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="shippingData.firstName"
                placeholder="First name"
              />
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="shippingData.lastName"
                placeholder="Last name"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input
                type="email"
                class="form-control"
                v-model="shippingData.email"
                placeholder="email@example.com"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <input
                type="text"
                class="form-control"
                v-model="shippingData.street"
                placeholder="Street"
              />
            </div>
            <div class="col-3">
              <input
                type="text"
                class="form-control"
                v-model="shippingData.number"
                placeholder="Nr."
              />
            </div>
            <div class="col-3">
              <input
                type="text"
                class="form-control"
                v-model="shippingData.floor"
                placeholder="Floor"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="shippingData.city"
                placeholder="City"
              />
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control"
                v-model="shippingData.zipCode"
                placeholder="ZIP code"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <select class="custom-select" v-model="shippingData.paymentMethod">
                <option selected>Payment method</option>
                <option value="ideal">iDeal</option>
                <!-- <option value="paypal">PayPal</option>
                <option value="creditcard">Creditcard</option> -->
              </select>
            </div>
          </div>
        </form>
      </div>
      <div class="col-sm-6">
        <h3>Order:</h3>
        <div class="container-fluid" id="phonesOrderSummary">
          <div v-for="phone in phones" v-bind:key="phone._id" class="row">
            <div class="col-9">
              <p>
                <img v-bind:src="'/images/' + phone.image" style="height:30px;" />
                {{phone.brand}} {{phone.model}}
              </p>
            </div>
            <div class="col-3">
              <p class="text-right">{{phone.price}},-</p>
            </div>
          </div>
        </div>
        <hr />
        <div class="container-fluid">
          <div class="row">
            <div class="col-9">
              <p>Total:</p>
            </div>
            <div class="col-3">
              <p class="text-right">{{shippingData.total}},-</p>
            </div>
          </div>
        </div>
        <!-- <button
          class="btn btn-primary"
          v-if="shippingData.firstName != '' && shippingData.lastName != '' && shippingData.email != '' && shippingData.street != '' && shippingData.number != '' && shippingData.floor != '' && shippingData.city != '' && shippingData.zipCode != '' && shippingData.paymentMethod != ''"
          @click="openVerify"
        >Verify</button> -->
        <button class="btn btn-primary" @click="openVerify">Verify (test)</button>
      </div>
    </div>

    <!-- Modal for verifying order -->
    <div class="modal" id="verifyModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Order summary:</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <p>
              Ships to:
              <br />
              <br />
              {{shippingData.firstName}} {{shippingData.lastName}}
              <br />
              {{shippingData.street}} {{shippingData.number}}{{shippingData.floor}}
              <br />
              {{shippingData.zipCode}} {{shippingData.city}}
            </p>

            <p>Payment method: {{shippingData.paymentMethod}}</p>

            <p>Total: {{shippingData.total}},-</p>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <a v-bind:href="paymentLink">
              <button type="button" class="btn btn-success" v-if="paymentLink != ''">Pay</button>
            </a>
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
      paymentLink: "",
      phones: [],
      shippingData: {
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        number: "",
        floor: "",
        city: "",
        zipCode: "",
        paymentMethod: "",
        total: ""
      }
    };
  },
  created() {
    this.phones = JSON.parse(sessionStorage.getItem("cart"));
    EventBus.$on("updateCheckout", cart => {
      this.phones = cart;
    });
  },
  methods: {
    openVerify() {
      $("#verifyModal").modal("show");
      let uri = "http://localhost:4000/payment?value=" + this.shippingData.total + ".00&method=" + this.shippingData.paymentMethod;
      this.axios.get(uri).then(response => {
        this.paymentLink = response.data.payment._links.checkout.href;

        this.phoneCount = this.phones.length;
      });
    }
    // mollieTest() {
    //   let uri = "http://localhost:4000/payment";
    // this.axios.get(uri).then(response => {
    //   console.log(response.data.payment._links.checkout.href)
    //   // this.phoneCount = this.phones.length;
    // });
    // }
  },
  watch: {
    phones: function() {
      let total = 0;
      for (let i = 0; i < this.phones.length; i++) {
        total += this.phones[i].price;
      }
      this.shippingData.total = total;
    }
  }
};
</script>

<style>
.form-control,
.custom-select {
  margin: 10px;
}

h3 {
  padding: 10px;
}

#phonesOrderSummary {
  margin-top: 18px;
}
</style>