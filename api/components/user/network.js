const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', upsert);
router.delete('/:id', remove);

function list(req, res) {
    controller.list()
        .then((list) => {
            response.success(req, res, list, 200);
        })
        .catch((e) => {
            response.error(req, res, 'Internal server error', 500, e);
        });
}

function get(req, res) {
    controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch((e) => {
            response.error(req, res, 'Internal server error', 500, e);
        });
}

function upsert(req, res) {
    controller.upsert(req.body)
        .then((result) => {
            response.success(req, res, result, 201);
        })
        .catch((e) => {
            response.error(req, res, 'Internal server error', 500, e);
        });
}

function remove(req, res) {
    controller.remove(req.params.id)
        .then((result) => {
            response.success(req, res, result, 200);
        })
        .catch((e) => {
            response.error(req, res, 'Internal server error', 500, e);
        });
}

module.exports = router;