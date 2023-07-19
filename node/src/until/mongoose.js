const { Mongoose } = require("mongoose");

module.exports={
    multipleMongooseToObject: function (mongooses) {
        return mongooses.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: function (mongoose){
        let obj = mongoose.toObject()
        let dateOfBirth = obj.dateOfBirth ;
        
        if(obj.img === '') {
            obj.img = "https://res.cloudinary.com/dk41ftplg/image/upload/v1688965244/Teach-Node/wkz0upebb9k3danolvbc.png"
        }
        else if (dateOfBirth)
        {
            dateOfBirth = mongoose.toObject().dateOfBirth.toISOString().split('T')[0]
        }
        
        return mongoose ? obj : mongoose;
    }
};