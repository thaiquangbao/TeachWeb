const express = require('express');
const editteacherRouter = express.Router();
const editteacherController = require('../app/controllers/TeacherController');
editteacherRouter.delete('/:_id/destroy',editteacherController.destroy)
editteacherRouter.patch('/:_id/restore',editteacherController.restore)
editteacherRouter.get('/:_id/edit', editteacherController.edit)
editteacherRouter.post('/create/insert', editteacherController.insert)
editteacherRouter.delete('/deleteBox', editteacherController.deleteBox)
editteacherRouter.patch('/restoreAll',editteacherController.restoreAll)
editteacherRouter.post('/delateAll', editteacherController.countDeleted)
editteacherRouter.put('/:_id', editteacherController.update)
editteacherRouter.delete('/:_id',editteacherController.delete)
editteacherRouter.get('/trash', editteacherController.trash)
editteacherRouter.get('/create', editteacherController.create)

editteacherRouter.get('/',editteacherController.table);

module.exports = editteacherRouter;