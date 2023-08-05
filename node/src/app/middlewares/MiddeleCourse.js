const courses = require('../models/sales');

class CheckCourse{
    verifyCourse(req,res,next){
        courses.findOne({_id:req.params._id})
        .then((course)=>{
            console.log(course.teacher)
            const teach =  String(course.teacher)
            //const converJson = JSON.stringify(teach)
           
            if(teach === "Chưa có giáo viên đảm nhiệm")
            {
                res.json({code:500, data : course})
            }
            else{
                next()
            }
        })
        .catch(error =>{
            res.json({code:501, message : "Khóa học không tồn tại"})
        })
    }
}   
module.exports = new CheckCourse()