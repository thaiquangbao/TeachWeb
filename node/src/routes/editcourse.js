const express = require('express')
const editCourseRouter = express.Router();

const editCourseController = require('../app/controllers/EditCourseController');
editCourseRouter.delete('/:_id/destroy',editCourseController.destroy)
editCourseRouter.patch('/:_id/restore',editCourseController.restore)
editCourseRouter.get('/:_id/edit',editCourseController.edit)
editCourseRouter.post('/insertCourse/insert',editCourseController.insert)
editCourseRouter.delete('/deleteBox',editCourseController.deleteBox)
editCourseRouter.delete('/:_id',editCourseController.delete)
editCourseRouter.put('/:_id',editCourseController.update)
editCourseRouter.patch('/restoreBox',editCourseController.restoreBox)
editCourseRouter.get('/trash',editCourseController.trash)
editCourseRouter.post('/deleteAll',editCourseController.countDeleted)
editCourseRouter.get('/insertCourse',editCourseController.create)
editCourseRouter.get('/',editCourseController.show)

module.exports = editCourseRouter;