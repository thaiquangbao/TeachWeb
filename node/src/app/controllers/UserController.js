const sales = require('../models/sales');
const users = require('../models/users')
const {multipleMongooseToObject} = require('../../until/mongoose');
const {mongooseToObject} = require('../../until/mongoose');
const { error } = require('jquery');
const { setMaxListeners } = require('../models/teachers');
class UserController {
  index(req, res, next) {
    //[Get] /users
    //res.render('home');
    sales.find({})
      .then(sale => //res.json()
        {
        res.render('home',{
          sales :  multipleMongooseToObject(sale)
        });
      })
      .catch(error =>{
        res.json('Lỗi render')
      });
  }
  buyCourse(req,res){
    let person = users.findById(req._id)
    let courses = sales.findOne({_id: req.params._id})
    Promise.all([person,courses])
    .then(([user,course]) =>{
     var coins = user.coin
     var gia = course.price
     var amout = coins - gia 
     var thieu = gia - coins  
     var sell = course.sold + 1 
      if(coins >= gia)
      { 
        var upSold = sales.updateOne({_id: req.params._id},{sold : sell })
        var upCoin =  users.updateOne({_id:req._id},{coin : amout})
        Promise.all([upSold,upCoin])
        .then(() =>{
          res.json({code: 200, data: amout})
        })
        .catch(error=>{
          res.json({code : 501 , err : error})
        })
      }
      else{
        res.json({code:250,data: thieu})
      } 
    })
    .catch(error =>{
      res.json('Không tìm được khóa học và user')
    })
    
  }
  show(req, res,next) {
    //[Get] /users/:slug
     sales.findOne({_id: req.params._id}) // tự update slug mới
      .then(sales => {
        //res.send('Ok')
        res.render('courses/show',{
          sales: mongooseToObject(sales)
        })
      })
      .catch(error=>{
        res.json('ERROR')
      });
  }

}
module.exports = new UserController();
