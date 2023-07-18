const express = require('express');
const useRouter = express.Router();

const siteController = require('../app/controllers/SiteController');
useRouter.get('/check-token', siteController.checkToken);
useRouter.get('/check-cookie', siteController.checkCookie);
// useRouter.get('/', siteController.search);
useRouter.get('/', siteController.index);

module.exports = useRouter;
