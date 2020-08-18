const express = require('express');

const response = require('../network/response');
const store = require('../store/redis');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.put('/:table', upsert);

function list(req, res, next) {
    store.list(req.params.table)
        .then(data => {
            return response.success(data);
        })
        .catch(next);
}

function get(req, res, next) {
    store.get(req.params.table, req.params.id)
        .then(data => {
            return response.success(data);
        })
        .catch(next);
}

function upsert(req, res, next) {
    store.upsert(req.params.table, req.body)
        .then(data => {
            return response.success(data);
        })
        .catch(next);
}

module.exports = router;
