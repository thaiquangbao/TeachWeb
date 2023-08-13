const mongoose = require('mongoose');
//const slug = require('mongoose-slug-generator');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const teachers = require('../models/teachers')
const Schema = mongoose.Schema;

//mongoose.plugin(slug2);
const sale = new Schema({
  
  item: { type: String },
  price: { type: Number },
  quantity: { type: Number },
  date: { type: Date },
  img: {type : String},
  slug:{type:String, slug:'item',unique: true},
  trinhDo:{type:String},
  idVideo:{type:String,require:true},
  soLuongVideo:String,
  soGio:String,
  title:String,
  sold: {type:Number,require:true,default:0},
  teacher : {
    _id : {type:mongoose.Schema.Types.ObjectId} ,
    hoTen :String,
    img : String,
    soLuongKhoaHoc: Number,
    tinhTrang : String,
    email:String,
  },
    
},{
  timestamps:true,
});
sale.query.sortable= function (req){
  if (req.query.hasOwnProperty('_sort')){
    const isValidType =['asc','desc'].includes(req.query.type);
    return this.sort({
        [req.query.column]: isValidType ? req.query.type:'desc',
      });
  }
  return this;
}
mongoose.plugin(slug);
sale.plugin(mongooseDelete,{ 
  deletedAt : true,
  overrideMethods: 'all' ,
});

module.exports = mongoose.model('Sale', sale);
