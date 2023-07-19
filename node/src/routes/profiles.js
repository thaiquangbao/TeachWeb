const express = require('express')
const profileRouter = express.Router();
const profileController = require('../app/controllers/ProfileController')
const uploadCloud = require('../config/uploader')
const proFileMiddleWare =  require('../app/middlewares/ProFileMiddleware')

profileRouter.put('/editpassword/update',proFileMiddleWare.verifyToken,profileController.updatePassword)
profileRouter.delete('/deleteAvatar/edit',proFileMiddleWare.verifyToken,profileController.deleteAvatar)
profileRouter.post('/editAvatar/edit',proFileMiddleWare.verifyToken,uploadCloud.single('img'),profileController.editAvatar)
profileRouter.put('/editprofile/edit',proFileMiddleWare.verifyToken,profileController.editProfile)
profileRouter.put('/general/edit',proFileMiddleWare.verifyToken,profileController.editGeneral)
profileRouter.delete('/delete-user',proFileMiddleWare.verifyToken,profileController.deleteUser)
profileRouter.get('/editpassword',proFileMiddleWare.verifyToken,profileController.showPassword)
profileRouter.get('/editprofile',proFileMiddleWare.verifyToken,profileController.showEditProfile)
profileRouter.get('/general',proFileMiddleWare.verifyToken,profileController.show)
module.exports = profileRouter