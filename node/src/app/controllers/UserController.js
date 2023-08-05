const sales = require('../models/sales');
const {multipleMongooseToObject} = require('../../until/mongoose');
const {mongooseToObject} = require('../../until/mongoose');
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
      .catch(next);
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
