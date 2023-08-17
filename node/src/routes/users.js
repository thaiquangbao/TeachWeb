const express = require('express');
const useRouter = express.Router();
const proFileMiddleWare =  require('../app/middlewares/CheckUser')
const userController = require('../app/controllers/UserController');
const middleCourse = require('../app/middlewares/MiddeleCourse');
useRouter.post('/buy/:slug/:_id',proFileMiddleWare.verifyToken, middleCourse.verifyCourse,userController.buyCourse)
useRouter.post('/check-buy/:_id',proFileMiddleWare.verifyToken, proFileMiddleWare.verifyToken,userController.study)
useRouter.get('/:slug/:_id', middleCourse.verifyCourse ,userController.show);
useRouter.get('/', userController.index);

module.exports = useRouter;
