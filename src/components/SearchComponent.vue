<template>

    <div class="col-sm-2">

            <!-- <div class="form-check">
  <input class="form-check-input" type="checkbox" value="Apple" id="brand1" v-model="brands" @change="brandSearch">
  <label class="form-check-label" for="brand1">
    Apple
  </label>
</div>
            <div class="form-check">
  <input class="form-check-input" type="checkbox" value="Honor" id="bran2" v-model="brands" @change="brandSearch">
  <label class="form-check-label" for="brand2">
    Honor
  </label>
</div>
            <div class="form-check">
  <input class="form-check-input" type="checkbox" value="Lenovo" id="brand3" v-model="brands" @change="brandSearch">
  <label class="form-check-label" for="brand3">
    Lenovo
  </label>
</div> -->

<div v-for="brandInDatabase in brandsInDatabase" v-bind:key="brandInDatabase._id" class="form-check"> 
<input class="form-check-input" type="checkbox" v-bind:value="brandInDatabase.brand" :id="brandInDatabase.brand" v-model="brands" @change="brandSearch">
  <label class="form-check-label" :for="brandInDatabase.brand">
    {{brandInDatabase.brand}}
  </label>

</div>

    </div>
    
</template>

<script>
import { EventBus } from "../event-bus";

export default {
    data() {
        return {
            brands: [],
            brandsInDatabase: [],
        }
    },
    created() {
        let uri = "http://localhost:4000/phones";

        let brandlist = []
        this.axios.get(uri).then(response => {
          for(let i = 0; i < response.data.length; i++) {           
           
          //  brandlist.push(response.data[i].brand)

          if(brandlist.includes(response.data[i].brand)) {
            console.log("Ik ken jou al!")
          }

          else {
            
            brandlist.push(response.data[i].brand)
            this.brandsInDatabase.push({"brand": response.data[i].brand})
            
          }

           
          }
        });  
    },
    methods: {
        brandSearch() {
            EventBus.$emit("searchData", this.brands);
        }
    }
}
</script>

<style>

</style>