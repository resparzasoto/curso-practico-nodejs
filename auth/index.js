const jwt = require('jsonwebtoken');

const config = require('../config');
const error = require('../utils/error');

function sign(data) {
    return jwt.sign(data, config.jwt.secret);
}

function verify(token) {
    return jwt.verify(token, config.jwt.secret);
}

const check = {
    own: (req, owner) => {
        const decoded = decodeHeader(req);

        if (config.api.environment === 'development') {
            console.log(decoded);
        }

        if (decoded.id !== owner) {
            throw error("You can't do that", 403);
        }
    },
    logged: (req) => {
        decodeHeader(req);
    },
}

function getToken(header) {
    if (!header) {
        throw error('Token not provided', 401);
    }

    if (header.indexOf('Bearer ') === -1) {
        throw error('Invalid format', 401);
    }

    const token = header.replace('Bearer ', '');

    return token;
}

function decodeHeader(req) {
    const authorizationHeader = req.headers.authorization || '';
    const token = getToken(authorizationHeader);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check,
};
