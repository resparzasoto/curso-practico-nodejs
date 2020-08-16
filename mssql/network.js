const express = require('express');

const response = require('../network/response');
const store = require('../store/mssql');

const router = express.Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.put('/:table', upsert);

function list(req, res, next) {
    store.list(req.params.table)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

function get(req, res, next) {
    store.get(req.params.table, req.params.id)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

function insert(req, res, next) {
    store.insert(req.params.table, req.body)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next);
}

function upsert(req, res, next) {
    store.upsert(req.params.table, req.body)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

module.exports = router;
