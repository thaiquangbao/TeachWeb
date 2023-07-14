const sales = require('../models/sales')
const users = require('../models/users')
const {multipleMongooseToObject} = require('../../until/mongoose')

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

}

module.exports = new SiteController();
