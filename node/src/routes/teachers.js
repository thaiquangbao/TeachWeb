const express = require('express');
const teacherRouter = express.Router();
const teacherController = require('../app/controllers/TeacherController');



teacherRouter.get('/', teacherController.show)

module.exports = teacherRouter;