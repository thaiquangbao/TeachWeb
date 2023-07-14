const express = require('express');
const useRouter = express.Router();

const siteController = require('../app/controllers/SiteController');


// useRouter.get('/', siteController.search);
useRouter.get('/', siteController.index);

module.exports = useRouter;
