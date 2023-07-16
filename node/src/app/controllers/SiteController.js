const sales = require('../models/sales')
const Users = require('../models/users')
const {multipleMongooseToObject} = require('../../until/mongoose')
const jwt = require('jsonwebtoken')
const {mongooseToObject} = require('../../until/mongoose');
class SiteController {
  // index(req, res) {
  //   //[Get] /
  //   res.render('trangchu');
  // }
  index(req, res,next) {
    sales.find({})
      .then(sales => {
        res.render('trangchu',{
          sales : multipleMongooseToObject(sales)
        });
      })
      .catch(error=>{

      });
    
  }
  checkCookie(req,res,next){
    var cookies = req.cookies.token
    var decodeToken = jwt.verify(cookies,process.env.MY_SERECT_KEY)
    Users.findOne(decodeToken._id)
    .then(users=>{
        res.render('partials/header',{
          users : mongooseToObject(users)
        })
    })
    .catch(error =>{
      res.json({code : 403, message : "Bạn cần đăng nhập trước khi vào"})
    })
  }
}


module.exports = new SiteController();
