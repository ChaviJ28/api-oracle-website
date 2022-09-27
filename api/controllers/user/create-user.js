module.exports = {
    friendlyName: "Creates a new user",
    description: "Creates a new user",
    inputs: {
        data: {
            type: {},
            example: {
                email: "chavi.surujbhali@umail.uom.ac.mu",
                full_name: "Chavi Surujbhali",
                username: "ChaviJ28",
                password: "test"
            }
        },
        auth: {
            type: {},
            example: {
                app_token: ""
            }
        }
    },
    exits: {
        jsonError: {
            responseType: "jsonError"
        },
        success: {
            responseType: "jsonOk"
        }
    },
    fn: async function (inputs, exits) {
        try {
            var error = [],
                insertParams = {},
                simpleValidator = require("@suyashsumaroo/simple-validator"),
                validationElements = [],
                addedResponse = "";

            if (inputs.data) {
                validationElements = [{
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.email,
                    name: "Email",
                    required: User.attributes.email.required
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.full_name,
                    name: "Full Name",
                    required: User.attributes.full_name.required
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.username,
                    name: "Username",
                    required: User.attributes.username.required
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.password,
                    name: "Password",
                    required: User.attributes.password.required
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.administrator,
                    name: "Administrator",
                    required: User.attributes.administrator.required,
                    in: User.attributes.administrator.isIn
                }];

                error = simpleValidator.validate(validationElements);

                if (error.length > 0) {
                    return exits.jsonError(error);
                } else {
                    validRights = await sails.helpers.user.validateAccessRights(inputs.data.access);
                    if (!validRights) {
                        error.push(await sails.helpers.utility.getAppError("general.invalid_parameters"));
                        return exits.jsonError(error);
                    }

                    insertParams = {
                        email: inputs.data.email,
                        full_name: inputs.data.full_name,
                        username: inputs.data.username,
                        password: inputs.data.password,
                        administrator: inputs.data.administrator,
                        access: inputs.data.access
                    };

                    addedResponse = await User.create(insertParams).fetch();

                    return exits.success({
                        data: {
                            user: addedResponse
                        }
                    });
                }
            }
        } catch (err) {
            sails.log.debug("create-user.js (Line: 98) : e"); //debug
            sails.log.debug(err); //debug

            error.push(await sails.helpers.utility.getAppError("record.create_error"));
            return exits.jsonError(error);
        }
    }
};