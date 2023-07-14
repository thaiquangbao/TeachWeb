const jwt = require('jsonwebtoken')

class CheckUser{
    verifyToken(req,res,next){
         const token = req.cookies.token
            if (token) {
            jwt.verify(token,process.env.MY_SERECT_KEY,(err,user)=>{
                if (err) {
                    res.json({code : 403, message : "Bạn cần đăng nhập trước khi vào"})
                }
                else{
                    
                    next()
                    
                }
            })
         }else  {
            res.redirect('/account')
    }
}
}
module.exports =new CheckUser()