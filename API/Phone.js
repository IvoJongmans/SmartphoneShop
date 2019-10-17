const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema for phone
let Phone = new Schema({
  brand: {
    type: String, sparse: true
  },
  model: {
    type: String, sparse: true
  },
  color: {
    type: String, sparse: true
  },
  price: {
    type: Number, sparse: true
  },
},{
    collection: 'phones'
});

module.exports = mongoose.model('Phone', Phone);