const express = require('express')
const courseRouter = express.Router();
const middleUser = require('../app/middlewares/CheckUser')
const courseController = require('../app/controllers/CourseController');
courseRouter.get('/My-Course',middleUser.verifyToken,courseController.show)
courseRouter.post('/store',courseController.store)
courseRouter.get('/',courseController.create)

module.exports = courseRouter;

