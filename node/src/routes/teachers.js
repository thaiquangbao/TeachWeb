const express = require('express');
const teacherRouter = express.Router();
const teacherController = require('../app/controllers/TeacherController');


teacherRouter.post('/check-email',teacherController.checkEmail)
teacherRouter.get('/', teacherController.show)

module.exports = teacherRouter;