const sales = require('../models/sales');
const users = require('../models/users')
const {multipleMongooseToObject} = require('../../until/mongoose');
const {mongooseToObject} = require('../../until/mongoose');

class CourseController{
  create(req,res){
    res.render('courses/create')
  };
  //dùng để post dữ liệu lên client
  store(req,res,next){
    const formData= req.body ;
    const course = new sales(formData);
    course.save()
      .then(()=> res.redirect('/editcourse')) // truy cập đến trang chính
      .catch(error =>{
    });
  };
  show(req,res){
    users.findById(req._id)
    .then((user) =>{
      var u = user.course;
      res.render('users/myCourse',{
        courses : multipleMongooseToObject(u)
      });
    })
    .catch(error =>{
      console.log(error);
    })
  }
  
}
module.exports= new CourseController();