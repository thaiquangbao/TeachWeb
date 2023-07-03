const teachers = require('../models/teachers')
const {multipleMongooseToObject} = require('../../until/mongoose');
const {mongooseToObject} = require('../../until/mongoose');

class ProfileController{
    show(req,res){
        teachers.findOne({hoTen:'Thái Quang Bảo'})
        .then(teachers => {
            res.render('users/show',{
                teachers : mongooseToObject(teachers)
            })
        })
        .catch(error =>{
            
        })
        
    }
}
module.exports= new ProfileController();