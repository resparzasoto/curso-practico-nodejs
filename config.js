module.exports = {
    api: {
        port: process.env.PORT || 3000,
        environment: process.env.NODE_ENV || "development",
    },
    post: {
        port: process.env.POST_PORT || 3002,
    },
    jwt: {
        secret: process.env.SECRET || "s3cr3t-phr4s3d",
    },
    mssql: {
        server: process.env.MSSQL_SERVER || "RUBENMSI",
        port: Number(process.env.MSSQL_PORT) || 1433,
        user: process.env.MSSQL_USER || "sa",
        password: process.env.MSSQL_PASSWORD || "Admin.123456",
        database: process.env.MSSQL_DATABASE || "platzisocial",
        options: {
            encrypted: process.env.MSSQL_OPTIONS_ENCRYPTED || true,
            enableArithAbort: Boolean(process.env.MSSQL_OPTIONS_ENABLE_ARITH_ABORT) || true,
        },
    },
    mssqlService: {
        host: process.env.MSSQL_SERVICE_HOST || "localhost",
        port: process.env.MSSQL_SERVICE_PORT || 3001,
    },
};
