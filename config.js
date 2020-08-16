module.exports = {
    api: {
        port: process.env.PORT,
        environment: process.env.NODE_ENV,
    },
    post: {
        port: process.env.POST_PORT,
    },
    jwt: {
        secret: process.env.SECRET,
    },
    mssql: {
        server: process.env.MSSQL_SERVER,
        port: Number(process.env.MSSQL_PORT),
        user: process.env.MSSQL_USER,
        password: process.env.MSSQL_PASSWORD,
        database: process.env.MSSQL_DATABASE,
        options: {
            encrypted: process.env.MSSQL_OPTIONS_ENCRYPTED,
            enableArithAbort: Boolean(process.env.MSSQL_OPTIONS_ENABLE_ARITH_ABORT),
        },
    },
    mssqlService: {
        host: process.env.MSSQL_SERVICE_HOST,
        port: process.env.MSSQL_SERVICE_PORT,
    },
};
