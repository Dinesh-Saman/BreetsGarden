const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  ItemsN: {
    type: String,
    required: true
  },

  size: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  
  image: {
   type:[ String],
   required: true
  },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
