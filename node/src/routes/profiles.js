const express = require('express')
const profileRouter = express.Router();
const profileController = require('../app/controllers/ProfileController')
profileRouter.put('/editprofile/edit',profileController.editProfile)
profileRouter.put('/general/edit',profileController.editGeneral)
profileRouter.get('/editpassword',profileController.showPassword)
profileRouter.get('/editprofile',profileController.showEditProfile)
profileRouter.get('/general',profileController.show)
module.exports = profileRouter