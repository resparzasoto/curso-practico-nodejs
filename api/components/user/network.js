const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.get('/', (req, res) => {
    controller.list()
        .then((list) => {
            response.success(req, res, list, 200);
        })
        .catch((e) => {
            response.error(req, res, e.message, 500);
        });
});

router.get('/:id', (req, res) => {
    controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch((e) => {
            response.error(req, res, e.message, 500);
        });
});

router.delete('/:id', (req, res) => {
    controller.remove(req.params.id)
        .then((result) => {
            response.success(req, res, result, 200);
        })
        .catch((e) => {
            response.error(req, res, e.message, 500);
        });
});

module.exports = router;