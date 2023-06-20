const express = require('express')
const courseRouter = express.Router();

const courseController = require('../app/controllers/CourseController');

courseRouter.post('/store',courseController.store)
courseRouter.get('/',courseController.create)

module.exports = courseRouter;

