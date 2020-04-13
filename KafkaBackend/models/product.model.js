const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// date in clickCount can be mm/dd/yyy. Before insertion or updation, get your date in this format?
const clickCount = new Schema({
  date:{type:String,required:true},
  count:{type:Number,required:true}
},{
  timestamps:true
});

const product = new Schema({
  validFlag:{type:String,default:"true"},
  sellerEmailId:{type:String,required:true},
  sellerName:{type:String,required:true},
  productName:{type:String,required:true},
  productCategory:{type:String,required:true},
  productPrice:{type:String,required:true},
  averageRating:{type:Number,default:0.0},
  productDescription:{type:String,required:true},
  photos:[String],
  clickCount:[clickCount],
},{
  timestamps:true
});

module.exports = mongoose.model('product',product);