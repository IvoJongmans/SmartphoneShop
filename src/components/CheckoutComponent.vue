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
        </form>
      </div>
      <div class="col-sm-6">
        <h3>Order summary:</h3>
        <div class="container-fluid" id="phonesOrderSummary">
          <div v-for="phone in phones" v-bind:key="phone._id" class="row">
            <div class="col-9">
              <p><img v-bind:src="'/images/' + phone.image" style="height:30px;"/> {{phone.brand}} {{phone.model}}</p>
            </div>
            <div class="col-3">
              <p class="text-right">{{phone.price}},-</p>
            </div>
            </div>
          </div>
          <hr/>
          <div class="container-fluid">
            <div class="row">
              <div class="col-9"><p>
                Total:
              </p></div>
              <div class="col-3"><p class="text-right">{{total}},-</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>


<script>
export default {
  data() {
    return {
      phones: [],
      shippingData: {
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        number: "",
        floor: "",
        city: "",
        zipCode: ""
      },
      total: []
    };
  },
  created() {
    this.phones = JSON.parse(sessionStorage.getItem("cart"));
  },
  watch: {
    phones:function() {
      let total = 0
      for(let i = 0; i < this.phones.length; i++) {
        total += this.phones[i].price
      }
      this.total = total
    }
  }
};
</script>

<style>
.form-control {
  margin: 10px;
}

h3 {
  padding: 10px;
}

#phonesOrderSummary {
  margin-top: 18px;
}
</style>