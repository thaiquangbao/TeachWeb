const sales = require('../models/sales');
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
}
module.exports= new CourseController();