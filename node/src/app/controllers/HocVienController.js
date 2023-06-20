const hocviens= require('../models/hocviens');
const {multipleMongooseToObject} = require('../../until/mongoose');
const {mongooseToObject} = require('../../until/mongoose');

class HocVienController{
    show(req,res,next){
        hocviens.find({})
            .then(hocviens=>
                {
                    res.render('sinhviens/info',{
                        hocviens : multipleMongooseToObject(hocviens)
                    });
                })
            .catch(next);
            
    }
    create(req,res){
        res.render('sinhviens/themhv');
    }
    insert(req,res,next){
        res.json (req.body)
        // const formData = req.body;
        // const hocvien = new hocviens(formData);
        // hocvien.save()
        //     .then(()=> res.redirect('/hocviens'))
        //     .catch(error=>{

        //     });
    }
    edit(req,res,next){
        hocviens.findById(req.params.id)
            .then(hocviens => res.render('sinhviens/edit',{
                hocviens : mongooseToObject(hocviens)
            })
            )
            .catch(next);

    }
    //[PUT] /hocviens/:id
    update(req,res,next){    
        hocviens.updateOne({_id:req.params.id},req.body)
            .then(()=> res.redirect('/hocviens'))
            .catch(next);
        
    }
    delete(req,res,next){
        hocviens.deleteOne({_id:req.params.id})
            .then(()=> res.redirect('back'))
            .catch(next);
    }
}
module.exports = new HocVienController();