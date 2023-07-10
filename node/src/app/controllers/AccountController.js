class AcountController{
    show(req,res){
        res.render('welcome')
    }
}
module.exports = new AcountController();