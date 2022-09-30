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
                validRights = await sails.helpers.user.validAccessRights(inputs.auth.user_token, "create_user")
                if (!validRights) {
                    error.push(await sails.helpers.utility.getAppError("user.no_access"));

                    return exits.jsonError(error);
                } else {
                    await User.destroy(inputs.data);

                    await sails.helpers.customLog.createCustomLog({
                        title: "Delete User",
                        description: "User " + inputs.data.full_name + " deleted",
                        user_id: inputs.auth.user_token || null
                    })


                    exits.success({
                        success_message: "User deleted successfully"
                    });
                }

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