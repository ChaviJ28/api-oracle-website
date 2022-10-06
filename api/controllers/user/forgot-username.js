module.exports = {
    friendlyName: "Forgot username",
    description: "Forgot username",
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
                        title: "Forgot Username",
                        description: "params: " + JSON.stringify(searchCriteria),
                    })

                    userList = await User.find({
                        email: inputs.data.email.toLowerCase()
                    });

                    if (userList[0]) {

                        //send username to email


                        return exits.success({
                            success_messsage: "Check Email Inbox for Username"
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