const teachers = require('../models/teachers');
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
        teachers.findOne({email: req.params.email})
            .then(teachers =>{
                res.render('teachers/update',{
                    teachers : mongooseToObject(teachers)
                });
            })
            .catch(next);
        
    }
    update(req,res,next){
        let validEmail = teachers.findOne({ email: req.body.email })
        let updateEmail = teachers.updateOne({email: req.params.email},
            {email:req.body.email,hoTen:req.body.hoTen,gioiTinh:req.body.gioiTinh,lop:req.body.lop,img:req.body.img,description:req.body.description,tinhTrang:req.body.tinhTrang,soLuongKhoaHoc:req.body.soLuongKhoaHoc})
        Promise.all([validEmail,updateEmail])
        .then(([valid,update]) => {
            if (!valid) {
                res.json({code :200 , message :'success'})
            }
            else{
                res.json({code : 501 , message: 'fail'})
            }   
            
        })
        .catch(err => {
            res.json({code : 500 , message: 'fail'})
        })
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
        teachers.delete({email: req.params.email})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    restore(req,res,next){
        teachers.restore({email:req.params.email})
            .then(()=> res.redirect('back'))
            .catch(next);
    }
    destroy(req,res,next){
        teachers.deleteOne({email:req.params.email})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    countDeleted(req,res,next){
        teachers.delete({email:{ $in : req.body.teacherId}})
            .then(()=> res.redirect('back'))
            .catch(next);

    }
    restoreAll(req,res,next){
        teachers.restore({email:{$in :req.body.teacherId }})
            .then(()=>res.redirect('back'))
            .catch(next);
       
    }
    deleteBox(req,res,next){
        teachers.deleteMany({email:{$in :req.body.teacherId }})
        .then(()=>res.redirect('back'))
        .catch(next);
    }
    
}

module.exports = new TeacherController();