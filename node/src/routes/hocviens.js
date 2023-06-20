const express = require('express')
const hocVienRouter = express.Router();
const hocVienController = require('../app/controllers/HocVienController');
hocVienRouter.get('/:id/edit',hocVienController.edit)
hocVienRouter.post('/themhv/insert',hocVienController.insert)
hocVienRouter.get('/themhv',hocVienController.create)
hocVienRouter.delete('/:id',hocVienController.delete)
hocVienRouter.put('/:id',hocVienController.update)
hocVienRouter.get('/',hocVienController.show);

module.exports = hocVienRouter;