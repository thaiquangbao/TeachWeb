const { Mongoose } = require("mongoose");

module.exports={
    multipleMongooseToObject: function (mongooses) {
        return mongooses.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: function (mongoose){
        let obj = mongoose.toObject()
        obj.dateOfBirth = mongoose.toObject().dateOfBirth.toISOString().split('T')[0]
        
        return mongoose ? obj : mongoose;
    }
};