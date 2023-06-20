const express = require('express')
const editCourseRouter = express.Router();

const editCourseController = require('../app/controllers/EditCourseController');
editCourseRouter.delete('/:item/destroy',editCourseController.destroy)
editCourseRouter.patch('/:item/restore',editCourseController.restore)
editCourseRouter.get('/:item/edit',editCourseController.edit)
editCourseRouter.post('/insertCourse/insert',editCourseController.insert)
editCourseRouter.delete('/deleteBox',editCourseController.deleteBox)
editCourseRouter.delete('/:item',editCourseController.delete)
editCourseRouter.put('/:item',editCourseController.update)
editCourseRouter.get('/trash',editCourseController.trash)
editCourseRouter.patch('/restoreBox',editCourseController.restoreBox)

editCourseRouter.post('/deleteAll',editCourseController.countDeleted)
editCourseRouter.get('/insertCourse',editCourseController.create)
editCourseRouter.get('/',editCourseController.show)

module.exports = editCourseRouter;