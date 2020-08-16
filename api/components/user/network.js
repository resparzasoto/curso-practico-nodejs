const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');
const secure = require('./secure');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.get('/:id/following', following);
router.post('/follow/:id', secure('follow'), follow);
router.post('/', upsert);
router.put('/', secure('update'), upsert);
router.delete('/:id', remove);

function list(req, res, next) {
    controller.list()
        .then((list) => {
            response.success(req, res, list, 200);
        })
        .catch(next);
}

function get(req, res, next) {
    controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
}

function upsert(req, res, next) {
    controller.upsert(req.body)
        .then((result) => {
            response.success(req, res, result, 201);
        })
        .catch(next);
}

function remove(req, res, next) {
    controller.remove(req.params.id)
        .then((result) => {
            response.success(req, res, result, 200);
        })
        .catch(next);
}

function follow(req, res, next) {
    controller.follow(req.user.id, req.params.id)
        .then(data => {
            return response.success(req, res, data, 201);
        })
        .catch(next);
}

function following(req, res, next) {
    controller.following(req.params.id)
        .then((result) => {
            return response.success(req, res, result, 200);
        })
        .catch(next);
}

module.exports = router;
