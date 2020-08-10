module.exports = {
    api: {
        port: process.env.PORT,
        environment: process.env.NODE_ENV,
    },
    jwt: {
        secret: process.env.SECRET,
    },
};
