module.exports = {
    friendlyName: "Lists Users",
    description: "Lists Users",
    inputs: {
        data: {
            type: {},
            example: {
                data: {
                    search_criteria: {
                        id: "12345"
                    }
                }
            }
        },
        auth: {
            type: {},
            example: {
                app_token: "",
                user_token: "",
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

            validRights = await sails.helpers.user.validateAccessRights(inputs.auth.user_token, "list_user")
            if (!validRights) {
                error.push(await sails.helpers.utility.getAppError("user.no_access"));

                return exits.jsonError(error);
            } else {

                if (inputs && inputs.data) {
                    if (inputs.data.search_criteria) {
                        searchCriteria = inputs.data.search_criteria;
                    }

                    userList = await User.find(searchCriteria);

                    await sails.helpers.customLog.createCustomLog({
                        title: "List User",
                        description: "params: " + JSON.stringify(searchCriteria),
                        user_id: await sails.helpers.user.getIdFromToken(inputs.auth.user_token)
                    })

                    return exits.success({
                        data: userList
                    });
                } else {
                    error.push(await sails.helpers.utility.getAppError("general.invalid_parameters"));

                    return exits.jsonError(error);
                }
            }
        } catch (err) {
            sails.log.debug("list-user.js (Line: 51) : e"); //debug
            sails.log.debug(err); //debug

            error.push(await sails.helpers.utility.getAppError("record.list_error"));

            return exits.jsonError(error);
        }
    }
};