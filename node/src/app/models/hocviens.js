const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;
mongoose.plugin(slug);

const hocvien = new Schema({
    _id:{type:Number},
    hoTen: {
        ho : String,
        ten : String,
    },
    gioiTinh: {type:String},
    noiSinh: {type:String},
    lop:{type:String},
    img:{type:String},
    
},{
    timestamps:true,
});
module.exports = mongoose.model('Hocviens',hocvien);
