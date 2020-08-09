const jwt = require('jsonwebtoken');

const config = require('../config');

function sign(data) {
    return jwt.sign(data, config.jwt.secret);
}

function verify(token) {
    return jwt.verify(token, config.jwt.secret);
}

const check = {
    own: (req, owner) => {
        const decoded = decodeHeader(req);

        console.log(decoded);

        if (decoded.id !== owner) {
            throw new Error("You can't do that");
        }
    },
}

function getToken(header) {
    if (!header) {
        throw new Error('Token not provided');
    }

    if (header.indexOf('Bearer ') === -1) {
        throw new Error('Invalid format');
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
