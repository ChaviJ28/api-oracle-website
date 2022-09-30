module.exports = {
    friendlyName: "Forgot password",
    description: "Forgot password",
    inputs: {
        data: {
            type: {},
            example: {
                data: {
                    email: ""
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
                plainPassword = "",
                hashPassword = "",
                userList = [];


            if (inputs.data) {
                validationElements = [{
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.email,
                    name: "Email",
                    required: true
                }];

                error = simpleValidator.validate(validationElements);

                if (error.length > 0) {
                    return exits.jsonError(error);
                } else {

                    await sails.helpers.customLog.createCustomLog({
                        title: "Forgot Password",
                        description: "params: " + searchCriteria,
                    })

                    userList = await User.find({
                        email: inputs.data.email.toLowerCase()
                    });

                    if (userList[0]) {

                        //generate plain password
                        plainPassword = randomstring.generate({
                            length: 8,
                            charset: "alphanumeric"
                        });

                        //hash password
                        hashPassword = await sails.helpers.utility.hashPassword(plainPassword);

                        //update record
                        insertParams = {
                            password: hashPassword
                        };

                        addedResponse = await User.update({ id: userList[0].id }, insertParams).fetch();

                        //send plain password to user through mail


                        return exits.success({
                            success_messsage: "Check Email Inbox for more Information"
                        });
                    } else {
                        error.push(await sails.helpers.utility.getAppError("user.invalid_email"));

                        return exits.jsonError(error);
                    }
                }
            } else {
                error.push(await sails.helpers.utility.getAppError("general.invalid_parameters"));

                return exits.jsonError(error);
            }
        } catch (err) {
            sails.log.debug("list-user.js (Line: 51) : e"); //debug
            sails.log.debug(err); //debug

            error.push(await sails.helpers.utility.getAppError("record.list_error"));

            return exits.jsonError(error);
        }
    }
};