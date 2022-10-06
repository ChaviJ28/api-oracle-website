module.exports = {
    friendlyName: "Login",
    description: "Login",
    inputs: {
        data: {
            type: {},
            example: {
                data: {
                    username: "ChaviJ28",
                    password: "test"
                }
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
                searchCriteria = {},
                validPassword = false,
                simpleValidator = require("@suyashsumaroo/simple-validator"),
                randomstring = require("randomstring"),
                userToken = "",
                userObject = {},
                userList = [];

            if (inputs && inputs.data) {

                validationElements = [{
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.username,
                    name: "username",
                    required: true
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.password,
                    name: "Password",
                    required: true
                }];

                error = simpleValidator.validate(validationElements);

                if (error.length > 0) {
                    exits.jsonError(error);
                } else {
                    userList = await User.find({
                        username: inputs.data.username
                    });

                    if (userList[0]) {
                        validPassword = await sails.helpers.utility.comparePassword(inputs.data.password, userList[0].password);

                        if (validPassword) {

                            if (userList[0].active == User.constants.active.yes) {

                                userToken = randomstring.generate({
                                    length: 54,
                                    charset: "alphanumeric"
                                });

                                userToken += userList[0].id

                                userToken += randomstring.generate({
                                    length: 21,
                                    charset: "alphanumeric"
                                });

                                await User.update({
                                    id: userList[0].id
                                }, {
                                    user_token: userToken
                                });

                                userObject = {
                                    email: userList[0].email,
                                    full_name: userList[0].full_name,
                                    username: userList[0].username,
                                    access: userList[0].access,
                                    user_token: userToken
                                }

                                return exits.success({
                                    success_message: "Login Successfully",
                                    data: {
                                        user: userObject
                                    }
                                });

                            } else {
                                error.push(await sails.helpers.utility.getAppError("user.not_active_user"));

                                return exits.jsonError(error);
                            }
                        } else {
                            error.push(await sails.helpers.utility.getAppError("user.invalid_login_password"));

                            return exits.jsonError(error);
                        }
                    } else {
                        error.push(await sails.helpers.utility.getAppError("user.invalid_login_username"));

                        return exits.jsonError(error);
                    }
                }

            } else {
                error.push(await sails.helpers.utility.getAppError("general.invalid_parameters"));

                return exits.jsonError(error);
            }
        } catch (err) {
            sails.log.debug("login.js (Line: 51) : e"); //debug
            sails.log.debug(err); //debug

            error.push(await sails.helpers.utility.getAppError("record.list_error"));

            return exits.jsonError(error);
        }
    }
};