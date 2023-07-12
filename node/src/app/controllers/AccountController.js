const Users =require('../models/users')
const bcrypt = require('bcryptjs')
class AcountController{
    showsigin(req,res){
        res.render('welcome')
    }
    showsignup(req,res){
        res.render('signup/dk')
    }
    signup(req, res, next) {
        let findUser = Users.findOne({ username: req.query.username });
        let findEmail = Users.findOne({ email: req.query.email });
        Promise.all([findUser, findEmail])
          .then(([users, emails]) => {
            if (!emails || !users) {
              bcrypt.genSalt(10)
                .then(salt => {
                  return bcrypt.hash(req.body.password, salt);
                })
                .then(hashed => {
                  const newUser = new Users({
                    username: req.body.username,
                    password: hashed,
                    email: req.body.email,
                    name: req.body.name,
                    dateOfBirth: req.body.dateOfBirth
                  });
                  return newUser.save();
                })
                .then(() => {
                  res.redirect('/account/signup');
                })
                .catch(err => {
                  res.status(500).json('Tạo k thành công do trùng username or password');
                });
            } else {
              console.log('Trùng dữ liệu');
              res.redirect('/account/signup');
            }
          })
          .catch(err => {
            res.status(500).json('Tạo k thành công');
          });
      }
    signin(req,res){

    }
    

}

module.exports = new AcountController();