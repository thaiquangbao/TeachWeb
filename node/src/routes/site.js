const express = require('express');
const useRouter = express.Router();

const siteController = require('../app/controllers/SiteController');
const checkUser = require('../app/middlewares/CheckUser')

// useRouter.get('/', siteController.search);
useRouter.get('/:token',checkUser.verifyToken, siteController.index);

module.exports = useRouter;
