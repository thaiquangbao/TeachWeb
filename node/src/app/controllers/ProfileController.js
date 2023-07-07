const teachers = require('../models/teachers')
const {multipleMongooseToObject} = require('../../until/mongoose');
const {mongooseToObject} = require('../../until/mongoose');

class ProfileController{
    show(req,res){
        teachers.findOne({hoTen:'Thái Quang Bảo'})
        .then(teachers => {
            res.render('users/general',{
                teachers : mongooseToObject(teachers)
            })
        })
        .catch(error =>{
            
        })
        
    }
    editGeneral(req,res,next){
        teachers.updateOne({hoTen:'Thái Quang Bảo'},{email : req.body.email})
        .then(res.redirect('/profiles/general'))
        .catch(next)
    }
    showEditProfile(req,res){
        teachers.findOne({hoTen:'Thái Quang Bảo'})
        .then(teachers => {
            res.render('users/editprofile',{
                teachers : mongooseToObject(teachers)
            })
        })
        .catch(error =>{
            
        })
        
    }
    editProfile(req,res,next){
        teachers.updateOne({hoTen:'Thái Quang Bảo'},{gioiTinh : req.body.gioiTinh,lop : req.body.lop,dateOfBirth : req.body.dateOfBirth,bio : req.body.bio})
        .then(res.redirect('/profiles/editprofile'))
        .catch(next)
    }
    editAvatar(req,res,next){
        res.send('ok ròi đó')
        
    }
    showPassword(req,res){
        teachers.findOne({hoTen:'Thái Quang Bảo'})
        .then(teachers => {
            res.render('users/password',{
                teachers : mongooseToObject(teachers)
            })
        })
        .catch(error =>{
            
        })
        
    }
}
module.exports= new ProfileController();