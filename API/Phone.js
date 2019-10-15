const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema for phone
let Phone = new Schema({
  brand: {
    type: String
  },
  model: {
    type: String
  },
  color: {
    type: String
  },
  price: {
    type: String
  },
},{
    collection: 'phones'
});

module.exports = mongoose.model('Phone', Phone);