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
        Promise.all([teachers.find({}),teachers.countDocumentsDeleted()])
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
        const formData = req.body;
        const teacher = new teachers(formData)
        teacher.save()
            .then(()=> res.redirect('/editteachers'))
            .catch(error=>{

            });
    };
    edit(req,res,next){
        teachers.findOne({hoTen: req.params.hoTen})
            .then(teachers =>{
                res.render('teachers/update',{
                    teachers : mongooseToObject(teachers)
                });
            })
            .catch(next);
        
    }
    update(req,res,next){
        teachers.updateOne({hoTen: req.params.hoTen},req.body)
            .then(()=> res.redirect('/editteachers'))
            .catch(next);
    }
    trash(req,res,next){
        teachers.findDeleted({})
        .then(teachers=>{
          res.render('teachers/trash',{
              teachers : multipleMongooseToObject(teachers)
          });
         })
         .catch(next)
      
    }
    delete(req,res,next){
        teachers.delete({hoTen: req.params.hoTen})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    restore(req,res,next){
        teachers.restore({hoTen:req.params.hoTen})
            .then(()=> res.redirect('back'))
            .catch(next);
    }
    destroy(req,res,next){
        teachers.deleteOne({hoTen:req.params.hoTen})
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