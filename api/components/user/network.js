const express = require('express');

const response = require('../../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/', (req, res) => {
    const list = controller.list();
    response.success(req, res, list, 200);
});

router.delete('/:id', (req, res) => {
    const table = controller.remove(req.params.id);
    response.success(req, res, table, 200);
});

module.exports = router;