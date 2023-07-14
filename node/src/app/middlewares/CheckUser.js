const jwt = require('jsonwebtoken')
class CheckUser{
    verifyToken(req,res,next){
         const token = req.params.token
         
            if (token) {
            jwt.verify(token,process.env.MY_SERECT_KEY,(err,user)=>{
                if (err) {
                    res.json({code : 403, message : "Token is not valid"})
                }
                else{
                    
                    next()
                }
            })
         }else  {
            res.json({code : 401, message : "Bạn phải đăng nhập trước khi vào"})
    }
}
}
module.exports =new CheckUser()