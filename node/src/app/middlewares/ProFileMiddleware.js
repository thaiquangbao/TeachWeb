const jwt = require('jsonwebtoken')

class ProFileMiddleWare{
    verifyToken(req,res,next){
         const token = req.cookies.token
            if (token) {
            jwt.verify(token,process.env.MY_SERECT_KEY,(err,user)=>{
                if (err) {
                    res.json({code : 403, message : "Bạn cần đăng nhập trước khi vào"})
                }
                else{
                   req._id =  user._id
                    next()
                    
                }
            })
         }else  {
            res.json({code : 401, message : "You 're not authentication"})
    }
}
}
module.exports = new ProFileMiddleWare()