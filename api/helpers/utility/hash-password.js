module.exports = {
    friendlyName: "Hash passwords using bcrypt-nodejs",
    description: "Hash passwords using bcrypt-nodejs",
    inputs: {
        password: {
            type: "string",
            example: "test",
            description: "Password that will be hashed",
            required: true
        }
    },

    fn: async function (inputs, exits) {
        var hashedPassword = await new Promise(function (resolve, reject) {
            var bcrypt = require('bcrypt-nodejs');

            bcrypt.hash(inputs.password, null, null, function (err, hash) {
                if (err) reject(err);
                resolve(hash);
            });
        });

        return exits.success(hashedPassword);
    }
};