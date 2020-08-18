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
    remoteDB: process.env.REMOTE_DB || false,
    mssql: {
        server: process.env.MSSQL_SERVER,//|| "RUBENMSI",
        port: Number(process.env.MSSQL_PORT) || 1433,
        user: process.env.MSSQL_USER || "sa",
        password: process.env.MSSQL_PASSWORD || "Admin.123456",
        database: process.env.MSSQL_DATABASE || "platzisocial",
        options: {
            encrypted: Boolean(process.env.MSSQL_OPTIONS_ENCRYPTED) || true,
            enableArithAbort: Boolean(process.env.MSSQL_OPTIONS_ENABLE_ARITH_ABORT) || true,
        },
    },
    mssqlService: {
        host: process.env.MSSQL_SERVICE_HOST || "localhost",
        port: process.env.MSSQL_SERVICE_PORT || 3001,
    },
    cacheService: {
        host: process.env.CACHE_SERVICE_HOST || "localhost",
        port: process.env.CACHE_SERVICE_PORT || 3003,
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
    }
};
