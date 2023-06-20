const sales = require('../models/sales');
const {multipleMongooseToObject} = require('../../until/mongoose');
const {mongooseToObject} = require('../../until/mongoose');
class UserController {
  index(req, res, next) {
    //[Get] /users
    //res.render('home');
    sales.find({})
      .then(sales => //res.json()
        {
        res.render('home',{
          sales :  multipleMongooseToObject(sales)
        });
      })
      .catch(next);
  }

  show(req, res,next) {
    //[Get] /users/:slug
    sales.findOne({slug : req.params.slug}) // tự update slug mới
      .then(sales => {
        //res.send('Ok')
        res.render('courses/show',{
          sales: mongooseToObject(sales)
        })
      })
      .catch(next);
  }
}
module.exports = new UserController();
