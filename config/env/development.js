module.exports = {
    security: {
        cors: {
            // allowOrigins: [
            //   "https://example.com",
            // ]
        },
    },

    datastores: {
        default: {
            adapter: "sails-mongo",
            host: "localhost",
            port: 27017,
            database: "oracle-website"
        }
    },

    sockets: {
        // onlyAllowOrigins: [
        //   "https://example.com",
        //   "https://staging.example.com",
        // ],
    },

    log: {
        level: "debug"
    },



    http: {
        cache: 365.25 * 24 * 60 * 60 * 1000, // One year
        // trustProxy: true,

    },

    port: 4550,

    // ssl: undefined
};