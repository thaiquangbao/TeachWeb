const Users = require('../models/users')
const {multipleMongooseToObject} = require('../../until/mongoose');
const {mongooseToObject} = require('../../until/mongoose');

class ProfileController{
    show(req,res){
        Users.findById(req._id)
        .then(users => {
            res.render('users/general',{
                users : mongooseToObject(users)
            })
            
        })
        .catch(error =>{
            res.json({code : 404, message : 'Bạn không có trong danh sách người dùng'})
        })
       
        
    }
    editGeneral(req,res,next){
        let validEmail = Users.findOne({ email: req.query.email })
        let updateEmail = Users.updateOne({_id: req._id},{email : req.body.email})
        Promise.all([validEmail,updateEmail])
        .then(([valid,update]) => {
            if (!valid) {
                res.json({code :200 , message :'success'})
            }
            else{
                res.json({code : 501 , message: 'fail'})
            }   
            
        })
        .catch(err => {
            res.json({code : 500 , message: 'fail'})
        })
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
        
        teachers.updateOne({hoTen:'Thái Quang Bảo'},{img:req.file.path})
        .then(res.redirect('/profiles/editprofile'))
        .catch(next)
    }
    deleteAvatar(req,res,next){
        teachers.updateOne({hoTen:'Thái Quang Bảo'},{img:" "})
        .then(res.redirect('/profiles/editprofile'))
        .catch(next)
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