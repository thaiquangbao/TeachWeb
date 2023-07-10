const express = require('express')
const accountRouter = express.Router();
const accountController = require('../app/controllers/AccountController')
accountRouter.get('/' ,accountController.show)

module.exports = accountRouter;