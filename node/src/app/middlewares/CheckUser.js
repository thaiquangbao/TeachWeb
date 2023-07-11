const jwt = require('jsonwebtoken')
class CheckUser{
    verifyToken(req,res,next){
         const token = req.cookies.token
        console.log(token);
    }
}
module.exports =new CheckUser()