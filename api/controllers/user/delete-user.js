module.exports = {
    friendlyName: "Delete user",
    description: "Delete user",
    inputs: {
        data: {
            type: {},
            example: {
                id: "12345"
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
        var error = [],
            isEmptyObject = require("is-empty-object");

        try {
            if (inputs && inputs.data && !isEmptyObject(inputs.data)) {
                await User.destroy(inputs.data);
                exits.success({
                    success_message: "User deleted successfully"
                });

            } else {
                error.push(await sails.helpers.utility.getAppError("general.invalid_parameters"));
                exits.jsonError(error);
            }
        } catch (err) {
            sails.log.debug("delete-user.js (Line: 40) : e"); //debug
            sails.log.debug(err); //debug

            error.push(await sails.helpers.utility.getAppError("record.delete_error"));
            exits.jsonError(error);
        }
    }
}