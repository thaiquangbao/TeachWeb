const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const teacher = new Schema({
    email:{type: String},
    gioiTinh:{type: String},
    hoTen: {type:String },
    img:{type:String},
    description:{type:String},
    tinhTrang:String,
    soLuongKhoaHoc:Number,
},{
    timestamps:true,
});
mongoose.plugin(slug);
teacher.plugin(mongooseDelete,{ 
    deletedAt : true,

    overrideMethods:'all' ,
  });
module.exports= mongoose.model('Teachers',teacher);
