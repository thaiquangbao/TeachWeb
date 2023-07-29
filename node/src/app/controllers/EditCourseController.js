const sales = require('../models/sales');
const teachers = require('../models/teachers')
const {multipleMongooseToObject} = require('../../until/mongoose');
const {mongooseToObject} = require('../../until/mongoose');

class EditCourseController{
    show(req,res,next){
        let findCourse = sales.find({}).sortable(req);
       
        Promise.all([findCourse,sales.countDocumentsWithDeleted({deleted:true})])
            .then(([sales,deletedCount]) =>{
                res.render('courses/edit',{
                    deletedCount,
                    sales: multipleMongooseToObject(sales),
                })
            
    })
            .catch(next);
    };
    select(req,res){
        teachers.find({})
            .then(teachers =>{
                /* res.render('courses/create',{
                    teachers :  multipleMongooseToObject(teachers)
                }) */
                console.log(teachers)
            })
            .catch(error =>{
                res.status(500).json('Tạo k thành công');
            })
    }
    create(req,res){
        res.render('courses/create')
    }
    insert(req,res,next){
        const formData = req.body;
        const course = new sales(formData);
        course.save()
            .then(()=> res.redirect('/editcourse')) // truy cập đến trang chính
            .catch(error =>{
                
            });
            
    
       };
    edit(req,res,next){
        

        sales.findOne({item: req.params.item})
            .then(sales => {
                res.render('courses/update',{
                    sales : mongooseToObject(sales)
                });
            })
            .catch(next);
       
        
    }
    update(req,res,next){
        sales.updateOne({item: req.params.item},req.body)
            .then(()=> res.redirect('/editcourse'))
            .catch(next);
        
    }
    delete(req,res,next){
        sales.delete({item: req.params.item})
        .then(()=> res.redirect('back'))
        .catch(next);
    }
    trash(req,res,next){
        sales.findWithDeleted({ deleted: true })
            .then(sales=>{
                res.render('courses/trash',{
                    sales: multipleMongooseToObject(sales)
                });
            })
        .catch(next)
    }
    // [Patch] /editcourse/:item/restore
    restore(req,res,next){
        sales.restore({item: req.params.item})
        .then(()=> res.redirect('back'))
        .catch(next);
    }
    destroy(req,res,next){
        sales.deleteOne({item: req.params.item})
        .then(()=> res.redirect('back'))
        .catch(next);
    }
    countDeleted(req,res,next){
        
        sales.delete({item:{ $in : req.body.courseItem}})
            .then(()=> res.redirect('back'))
            .catch(next);
        
    }
    restoreBox(req,res,next){
        sales.restore({item:{$in: req.body.courseItem}})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    deleteBox(req,res,next){
        sales.deleteMany({item:{ $in : req.body.courseItem}})
            .then(()=> res.redirect('back'))
            .catch(next);
    }
    
}
module.exports = new EditCourseController();