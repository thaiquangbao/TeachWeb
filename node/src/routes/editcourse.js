const express = require('express')
const editCourseRouter = express.Router();

const editCourseController = require('../app/controllers/EditCourseController');
editCourseRouter.delete('/:_id/destroy',editCourseController.destroy)
editCourseRouter.patch('/:_id/restore',editCourseController.restore)
editCourseRouter.get('/:_id/edit',editCourseController.edit)
editCourseRouter.post('/insertCourse/insert',editCourseController.insert)
editCourseRouter.put('/down-course/:_id',editCourseController.downQuantity)
editCourseRouter.put('/up-course/:_id',editCourseController.upQuantity)
editCourseRouter.get('/find-teach/:hoTen',editCourseController.findTeach)

editCourseRouter.delete('/deleteBox',editCourseController.deleteBox)
editCourseRouter.delete('/:_id',editCourseController.delete)
editCourseRouter.put('/:_id',editCourseController.update)
editCourseRouter.patch('/restoreBox',editCourseController.restoreBox)
editCourseRouter.get('/trash',editCourseController.trash)
editCourseRouter.post('/deleteAll',editCourseController.countDeleted)
editCourseRouter.get('/insertCourse',editCourseController.create)
editCourseRouter.post('/check-course',editCourseController.checkCourse)


editCourseRouter.get('/',editCourseController.show)

module.exports = editCourseRouter;