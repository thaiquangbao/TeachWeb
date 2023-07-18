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
      const token = req.cookies.token
      if (token) {
        jwt.verify(token,process.env.MY_SERECT_KEY,(err,user)=>{
            if (err) {
              res.json({ message: false });
            }
            else{
              req._id =  user._id
              Users.findById(req._id)
              .then(users=>{
                const {password, ...currentUser} =users
                res.json({code:200,currentUser})
              })
              .catch(error =>{
                res.json({code : 404, message : 'Bạn không có trong danh sách người dùng'})
            })
            }
        })
      }else  {
        res.json({ message: false });
      }
  }
  checkToken(req,res){
    const token = req.cookies.token
    if (token) {
        jwt.verify(token, process.env.MY_SERECT_KEY,(err)=>{
            if(err){
              res.json({ message: false });
            }
            else{
              res.json({ message: true , token:token});
            }
        })
            
    } else {
        res.json({ message: false });
    }
}  
  
}

module.exports = new SiteController();
