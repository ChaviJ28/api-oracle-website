module.exports = {
    friendlyName: "Compare passwords using bcrypt-nodejs",
    description: "Compare passwords using bcrypt-nodejs",
    inputs: {
        inputPassword: {
            type: "string",
            example: "test",
            description: "password entered by user",
            required: true
        },
        dbPassword: {
            type: "string",
            example: "1231sdsfdf",
            description: "hashed password from db",
            required: true
        }
    },

    fn: async function (inputs, exits) {
        var validPassword = await new Promise(function (resolve, reject) {
            var bcrypt = require('bcrypt-nodejs');

            bcrypt.compare(inputs.inputPassword, inputs.dbPassword, function (err, valid) {
                if (err) reject(err);
                resolve(valid);
            });
        });

        return exits.success(validPassword);
    }
};