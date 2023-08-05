const courses = require('../models/sales');

class CheckCourse{
    verifyCourse(req,res,next){
        courses.findOne({_id:req.params._id})
        .then((course)=>{
            const teach = course.teacher
            const converJson = JSON.stringify(teach)
            
            if(!teach._id)
            {
                res.json({code:500, message : "Chưa có giáo viên đảm nhiệm"})
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
