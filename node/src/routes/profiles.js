const express = require('express')
const profileRouter = express.Router();
const profileController = require('../app/controllers/ProfileController')
profileRouter.get('/',profileController.show)
module.exports = profileRouter