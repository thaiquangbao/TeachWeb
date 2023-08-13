const express = require('express')
const courseRouter = express.Router();

const courseController = require('../app/controllers/CourseController');
courseRouter.get('/My-Course',courseController.show)
courseRouter.post('/store',courseController.store)
courseRouter.get('/',courseController.create)

module.exports = courseRouter;

