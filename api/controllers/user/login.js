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
                userList = [],
                skip = 0,
                sort = null,
                promise = null;

            if (inputs && inputs.data) {

                userList = await User.find({
                    username: inputs.data.username
                });

                if (userList.length > 0) {
                    //check password then
                }

                return exits.success({
                    success_message: "Login Successfully"
                });
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