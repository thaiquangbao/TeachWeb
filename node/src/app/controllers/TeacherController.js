const teachers = require('../models/teachers');
const courses = require('../models/sales');
const {multipleMongooseToObject} = require('../../until/mongoose');
const {mongooseToObject} = require('../../until/mongoose');

class TeacherController{
    show(req,res,next){
        teachers.find({})
          .then(teachers => {
            res.render('teachers/info',{
                teachers : multipleMongooseToObject(teachers)
            });
          })
          .catch(next)

    };
    table(req,res,next){
        Promise.all([teachers.find({}),teachers.countDocumentsWithDeleted({deleted:true})])
            .then(([teachers,deletedCount])=>
            res.render('teachers/list',{
                deletedCount ,
                teachers : multipleMongooseToObject(teachers),
            
            })
            )
            .catch(next)
    };

    create(req,res){
        res.render('teachers/create')
    };

    insert(req,res,next){
        teachers.findOne({email : req.body.email})
        .then((mail) =>{
            if(!mail){
                res.json({code:200})
                const formData = req.body;
                const teacher = new teachers(formData)
                return teacher.save()
            }
            else{
                 res.json({code:501,message: 'Trùng dữ liệu'})
            }
      })
       .catch(error=>{
                res.json({code:500,message: 'ERROR!'})
            });
    };
    edit(req,res,next){
        teachers.findOne({_id: req.params._id})
            .then(teachers =>{
                res.render('teachers/update',{
                    teachers : mongooseToObject(teachers)
                });
            })
            .catch(next);
        
    }
    update(req,res,next){
        const updateData = {
            hoTen: req.body.hoTen,
            gioiTinh: req.body.gioiTinh,
            lop: req.body.lop,
            img: req.body.img,
            description: req.body.description,
            tinhTrang: req.body.tinhTrang,
            soLuongKhoaHoc: req.body.soLuongKhoaHoc,
                };
            teachers.updateOne({ _id: req.params._id }, updateData)
            .then(() => {
                courses.updateMany({"teacher._id": req.params._id },{"teacher.img": req.body.img,"teacher.hoTen": req.body.hoTen,"teacher.tinhTrang": req.body.tinhTrang,"teacher.soLuongKhoaHoc": req.body.soLuongKhoaHoc})
                .then(()=> res.json({ code: 200, message: 'success' }))
                .catch(error => res.json({code : 502 , message : 'fail'})) 
            })
            .catch(error => {
            res.json({ code: 500, message: 'fail' });
          });
       
        
    };
        
    
    trash(req,res,next){
        teachers.findWithDeleted({deleted:true})
        .then(teachers=>{
          res.render('teachers/trash',{
              teachers : multipleMongooseToObject(teachers)
          });
         })
         .catch(next)
      
    }

    delete(req,res,next){
        teachers.delete({_id: req.params._id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    restore(req,res,next){
        teachers.restore({_id:req.params._id})
            .then(()=> res.redirect('back'))
            .catch(next);
    }
    destroy(req,res,next){
        teachers.deleteOne({_id:req.params._id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    countDeleted(req,res,next){
        teachers.delete({_id:{ $in : req.body.teacherId}})
            .then(()=> res.redirect('back'))
            .catch(next);

    }
    restoreAll(req,res,next){
        teachers.restore({_id:{$in :req.body.teacherId }})
            .then(()=>res.redirect('back'))
            .catch(next);
       
    }
    deleteBox(req,res,next){
        teachers.deleteMany({_id:{$in :req.body.teacherId }})
        .then(()=>res.redirect('back'))
        .catch(next);
    }
    
}

module.exports = new TeacherController();