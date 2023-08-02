const express = require('express');
const editteacherRouter = express.Router();
const editteacherController = require('../app/controllers/TeacherController');
editteacherRouter.delete('/:email/destroy',editteacherController.destroy)
editteacherRouter.patch('/:email/restore',editteacherController.restore)
editteacherRouter.get('/:email/edit', editteacherController.edit)
editteacherRouter.post('/create/insert', editteacherController.insert)
editteacherRouter.delete('/deleteBox', editteacherController.deleteBox)
editteacherRouter.patch('/restoreAll',editteacherController.restoreAll)
editteacherRouter.post('/delateAll', editteacherController.countDeleted)
editteacherRouter.put('/:email', editteacherController.update)
editteacherRouter.delete('/:email',editteacherController.delete)
editteacherRouter.get('/trash', editteacherController.trash)
editteacherRouter.get('/create', editteacherController.create)

editteacherRouter.get('/',editteacherController.table);

module.exports = editteacherRouter;