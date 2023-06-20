const express = require('express');
const useRouter = express.Router();

const userController = require('../app/controllers/UserController');

useRouter.get('/:slug', userController.show);
useRouter.get('/', userController.index);

module.exports = useRouter;
