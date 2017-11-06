const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

//console.log(State);


const ProductSchema = new Schema({
  name  : { type : String, required: true, trim: true },
  price    : { type : Number, required: true },
  stockQty : { type : Number, required: true },
  img :  { data: Buffer, contentType: String }
});

module.exports = mongoose.model('Product', ProductSchema, 'products');
