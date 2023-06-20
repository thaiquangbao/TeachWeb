const express = require('express');
const editteacherRouter = express.Router();
const editteacherController = require('../app/controllers/TeacherController');
editteacherRouter.delete('/:hoTen/destroy',editteacherController.destroy)
editteacherRouter.patch('/:hoTen/restore',editteacherController.restore)
editteacherRouter.get('/:hoTen/edit', editteacherController.edit)
editteacherRouter.post('/create/insert', editteacherController.insert)
editteacherRouter.delete('/deleteBox', editteacherController.deleteBox)
editteacherRouter.patch('/restoreAll',editteacherController.restoreAll)
editteacherRouter.post('/delateAll', editteacherController.countDeleted)
editteacherRouter.put('/:hoTen', editteacherController.update)
editteacherRouter.delete('/:hoTen',editteacherController.delete)
editteacherRouter.get('/trash', editteacherController.trash)
editteacherRouter.get('/create', editteacherController.create)

editteacherRouter.get('/',editteacherController.table);

module.exports = editteacherRouter;