const express = require('express')
const accountRouter = express.Router();
const accountController = require('../app/controllers/AccountController')
accountRouter.post('/signin/login',accountController.signin)
accountRouter.post('/signup/sign',accountController.signup)
accountRouter.get('/signup',accountController.showsignup)
accountRouter.get('/' ,accountController.showsigin)

module.exports = accountRouter;