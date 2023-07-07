const express = require('express')
const profileRouter = express.Router();
const profileController = require('../app/controllers/ProfileController')
const uploadCloud = require('../config/uploader')


profileRouter.get('/editAvatar/edit',uploadCloud.single('image'),profileController.editAvatar)
profileRouter.put('/editprofile/edit',profileController.editProfile)
profileRouter.put('/general/edit',profileController.editGeneral)
profileRouter.get('/editpassword',profileController.showPassword)
profileRouter.get('/editprofile',profileController.showEditProfile)
profileRouter.get('/general',profileController.show)
module.exports = profileRouter