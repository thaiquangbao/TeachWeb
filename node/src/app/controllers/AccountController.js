const Users =require('../models/users')
const bcrypt = require('bcryptjs')
class AcountController{
    showsigin(req,res){
        res.render('welcome')
    }
    showsignup(req,res){
        res.render('signup/dk')
    }
    signup(req,res){
        bcrypt.genSalt(10)
        .then(salt =>{
            return bcrypt.hash(req.body.password, salt);
        })
        .then(hashed =>{
            const newUser = new Users({
                username: req.body.username,
                password: hashed,
                email: req.body.email,
                name: req.body.name,
                dateOfBirth: req.body.dateOfBirth
            });
            return newUser.save();
        })
        .then(res.status(200).json({ message: 'success' }))
        .catch(error =>{
            res.json('Lỗi')
        })
    }

}

module.exports = new AcountController();