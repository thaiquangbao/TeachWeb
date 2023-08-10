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
    
    create(req,res){
        teachers.find({})
        .then(teacher =>{
            res.render('courses/create',{
                teachers : multipleMongooseToObject(teacher)
            })
        })
        .catch(error =>{
            res.json('Lỗi')
        })
        
    }
    insert(req,res,next){
        
        sales.findOne({item : req.body.item})
        .then((courses) =>{
            if(!courses){
                
                teachers.findOne({hoTen: req.body.hoTen})
                .then((teach) =>{
                    if (teach) {
                    const _id = teach.get('_id');
                    const soLuongKhoaHoc = teach.soLuongKhoaHoc+1;
                      const formData = {
                        item : req.body.item,
                        price : req.body.price,
                        img : req.body.img,
                        trinhDo : req.body.trinhDo,
                        idVideo : req.body.idVideo,
                        soLuongVideo :req.body.soLuongVideo,
                        soGio : req.body.soGio,
                        title : req.body.title,
                        teacher:{
                            _id: _id,
                            hoTen: req.body.hoTen,
                            img : teach.img,
                            soLuongKhoaHoc: soLuongKhoaHoc,
                            tinhTrang : teach.tinhTrang,
                            }
                
                        };
                        
                        const course = new sales(formData);  
                        course.save()
                        .then(() =>{
                            teachers.updateOne({_id: teach._id},{soLuongKhoaHoc: soLuongKhoaHoc})
                            .then(()=>{
                                res.json({code:200 , message : 'Thêm thành công'})
                            })
                            .catch(error =>{
                                res.json(error)
                            })
                        })
                        .catch((error) =>{
                            res.json({code:504 , message :'Thêm không thành công'})
                        })
                        
                        
                    }
                    else{
                        res.json({code: 503 ,message: 'Giáo viên không tồn tại'})
                    }
                    
                    
                })
                .catch(error=> res.json({code:502 , message : 'ERROR!!!'}))
            }
            else{
                res.json({code:501 , message : 'Tên khóa học đã tồn tại'})
            }
            
        })
       
        

        .catch(error =>{
            res.json({code:500 , message : 'ERROR!!!'})
        });
        
       };
    edit(req,res,next){
        const findTeach = teachers.find({});
        const findItem= sales.findOne({_id: req.params._id});
        
        Promise.all([findTeach,findItem])
            .then(([teach,sales]) => {
                res.render('courses/update',{
                    teachers : multipleMongooseToObject(teach),
                    sales : mongooseToObject(sales)
                });
            })
            .catch(error=>{
                res.json(error)
            });
       
        
    }
    update(req,res,next){
        teachers.findOne({hoTen: req.body.hoTen})
            .then((teach) =>{
                if (teach) {
                    
                const tinhTrang = teach.get('tinhTrang') 
                const soLuongKhoaHoc = teach.get('soLuongKhoaHoc')
                const img = teach.get('img')
                const _id = teach.get('_id')
                
                const formData = {
                    item : req.body.item,
                    price : req.body.price,
                    img : req.body.img,
                    trinhDo : req.body.trinhDo,
                    idVideo : req.body.idVideo,
                    soLuongVideo :req.body.soLuongVideo,
                    soGio : req.body.soGio,
                    title : req.body.title,
                    teacher:{
                        _id: _id,
                        hoTen: req.body.hoTen,
                        img : img,
                        soLuongKhoaHoc: soLuongKhoaHoc,
                        tinhTrang : tinhTrang,
                        }
            
                    };
                    sales.updateOne({_id: req.params._id},formData) 
                    .then(()=>res.json({code: 200 }))
                    .catch(error =>{
                        res.json({code:502, message : 'Cập nhật không thành công'})
                    })
                    
                }
                else{
                    res.json({code: 503 ,message: 'Giáo viên không tồn tại'})
                }
                
                
            })
            
       
        .catch(error =>{
            res.json({code:504,message: 'ERROR!!!' })
        })
        
        
    }
    delete(req,res,next){
        sales.delete({_id: req.params._id})
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
        sales.restore({_id: req.params._id})
        .then(()=> res.redirect('back'))
        .catch(next);
    }
    destroy(req,res,next){
        sales.deleteOne({_id: req.params._id})
        .then(()=> res.redirect('back'))
        .catch(next);
    }
    countDeleted(req,res,next){
        
        sales.delete({_id:{ $in : req.body.courseItem}})
            .then(()=> res.redirect('back'))
            .catch(next);
        
    }
    restoreBox(req,res,next){
        sales.restore({_id:{$in: req.body.courseItem}})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    deleteBox(req,res,next){
        sales.deleteMany({_id:{ $in : req.body.courseItem}})
            .then(()=> res.redirect('back'))
            .catch(next);
    }
    checkCourse(req,res){
        sales.findOne({item : req.body.item})
        .then((course) =>{
        if(course){
             res.json({exist:false})
        }
        else{
             res.json({exist:true})
        }
        })
        .catch(error =>{
        res.json(error)
        })
   }
   upQuantity(req,res){
        teachers.findOne({_id: req.params._id})
        .then((teach) =>{
            if (teach) 
            {           
                var upTeach = teach.get('soLuongKhoaHoc') + 1;
                teachers.updateOne({_id: req.params._id},{soLuongKhoaHoc:upTeach}) 
                .then(()=>
                    sales.updateMany({"teacher._id": req.params._id },{"teacher.soLuongKhoaHoc" : upTeach})
                    .then(()=> 
                        res.json({ code: 200, message: 'success' })
                    )
                    .catch(error => res.json({code : 505 , message : 'fail'})
                ))  
                .catch(error =>{
                    res.json({code:502, message : 'Cập nhật không thành công'})
                })
                    
            }
            else{
                res.json({code: 503 ,message: 'Giáo viên không tồn tại'})
            }
                
                
            })
        .catch(error =>{
            res.json({code:504,message: 'ERROR!!!' })
        }) 
    }
    downQuantity(req,res){
        teachers.findOne({_id: req.params._id})
        .then((teach) =>{
            if (teach) {    
                   
                var downTeach = teach.get('soLuongKhoaHoc') - 1;
                teachers.updateOne({_id: req.params._id},{soLuongKhoaHoc:downTeach}) 
                .then(()=>
                    sales.updateMany({"teacher._id": req.params._id },{"teacher.soLuongKhoaHoc" : downTeach})
                    .then(()=> 
                        res.json({ code: 200, message: 'success' })
                    )
                    .catch(error => res.json({code : 505 , message : 'fail'})
                ))  
                .catch(error =>{
                    res.json({code:502, message : 'Cập nhật không thành công'})
                })
                    
                }
                else{
                    res.json({code: 503 ,message: 'Giáo viên không tồn tại'})
                }
                
                
            })
            
            

        .catch(error =>{
            res.json({code:504,message: 'ERROR!!!' })
        }) 
    }
    findTeach(req,res){
        teachers.findOne({hoTen:req.params.hoTen})
        .then((teacherss) =>{
            res.json({code: 100 , data: teacherss})
        })
        .catch(error =>res.json({code:151 , status: 'Tìm không thấy'}))
    }
   
    
}
module.exports = new EditCourseController();
/*  upQuantity(req,res){
        teachers.findOne({_id: req.params._id})
        .then((teach) =>{
            if (teach) {        
            const tinhTrang = teach.get('tinhTrang') ;
            const soLuongKhoaHoc = teach.get('soLuongKhoaHoc')+1;
            const img = teach.get('img');
            const _id = teach.get('_id');
            const formData = {
                item : req.body.item,
                price : req.body.price,
                img : req.body.img,
                trinhDo : req.body.trinhDo,
                idVideo : req.body.idVideo,
                soLuongVideo :req.body.soLuongVideo,
                soGio : req.body.soGio,
                title : req.body.title,
                teacher:{
                    _id: _id,
                    hoTen: req.body.hoTen,
                    img : img,
                    soLuongKhoaHoc: soLuongKhoaHoc,
                    tinhTrang : tinhTrang,
                    }
                };
                
                sales.updateOne({_id: req.params._id},formData) 
                .then(()=>res.json({code: 200 }))
                .catch(error =>{
                    res.json({code:502, message : 'Cập nhật không thành công'})
                })
                    
                }
                else{
                    res.json({code: 503 ,message: 'Giáo viên không tồn tại'})
                }
                
                
            })
            
            

        .catch(error =>{
            res.json({code:504,message: 'ERROR!!!' })
        }) 
    } */