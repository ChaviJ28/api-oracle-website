module.exports = {
    friendlyName: "Update user",
    description: "Update user",
    inputs: {
        data: {
            type: {},
            example: {
                search_criteria: {
                    id: "123456789"
                },
                update_params: {
                    username: "another username"
                }
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
        var req = this.req,
            error = [],
            updateParams = {},
            userList = [],
            userRecord = {},
            isEmptyObject = require("is-empty-object");

        try {
            if (inputs.data && inputs.data.search_criteria && inputs.data.update_params && !isEmptyObject(inputs.data.search_criteria)) {
                validRights = await sails.helpers.user.validAccessRights(inputs.auth.user_token, "create_user")
                if (!validRights) {
                    error.push(await sails.helpers.utility.getAppError("user.no_access"));

                    return exits.jsonError(error);
                } else {
                    if (inputs.data.update_params.access) {
                        validInputRights = await sails.helpers.user.validateInputAccessRights(inputs.data.update_params.access);
                        if (validInputRights) {
                            userList = await User.find(inputs.data.search_criteria);
                            userRecord = userList[0];
                            updateParams = inputs.data.update_params;
                            if (userRecord.access == null) {
                                updateParams.access = inputs.data.update_params.access
                            } else {
                                updateParams.access = inputs.data.update_params.access.concat(userRecord.access);
                            }

                            updateResponse = await User.update(inputs.data.search_criteria, updateParams).fetch();

                        } else {
                            error.push(await sails.helpers.utility.getAppError("general.invalid_parameters"));

                            return exits.jsonError(error);
                        }
                    } else {
                        updateResponse = await User.update(inputs.data.search_criteria, inputs.data.update_params).fetch();
                    }

                    await sails.helpers.customLog.createCustomLog({
                        title: "Update User",
                        description: "User " + inputs.data.full_name + " updated with params : " + inputs.data.update_params,
                        user_id: inputs.auth.user_token || null
                    })

                    return exits.success({
                        success_message: "User updated successfully"
                    });
                }

            } else {
                error.push(await sails.helpers.utility.getAppError("general.invalid_parameters"));
                return exits.jsonError(error);
            }
        } catch (err) {
            sails.log.debug("update-user.js (Line: 70) : e"); //debug
            sails.log.debug(err); //debug

            error.push(await sails.helpers.utility.getAppError("record.update_error"));
            exits.jsonError(error);
        }
    }
}