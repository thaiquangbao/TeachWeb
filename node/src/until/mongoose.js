const { Mongoose } = require("mongoose");

module.exports={
    multipleMongooseToObject: function (mongooses) {
        
        return mongooses.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: function (mongoose){
        let obj = mongoose.toObject()
        let date = obj.dateOfBirth ;
        
        if(obj.img === '') {
            obj.img = "https://res.cloudinary.com/dk41ftplg/image/upload/v1718341154/Teach-Node/vdtihswgevluf4efpwhk.png"
           
        }
        else if (date)
        {
            date = mongoose.toObject().dateOfBirth.toISOString().split('T')[0]
        }
        
        return mongoose ? obj : mongoose;
    }
};