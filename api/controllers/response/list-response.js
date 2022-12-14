module.exports = {
    friendlyName: "Lists Responses",
    description: "Lists Responses",
    inputs: {
        data: {
            type: {},
            example: {
                data: {
                    search_criteria: {
                        id: "12345"
                    },
                    populate: {
                        response: true
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
                formList = [],
                promise = Response.find(inputs.data.search_criteria),
                skip = 0,
                sort = null;


            if (inputs && inputs.data) {
                validRights = await sails.helpers.user.validateAccessRights(inputs.auth.user_token, "responses")
                if (!validRights) {
                    error.push(await sails.helpers.utility.getAppError("user.no_access"));

                    return exits.jsonError(error);
                } else {
                    if (inputs.data.populate) {
                        if (inputs.data.populate.created_by) {
                            promise.populate("User")
                        }
                    }
                }

                formList = await promise.then();

                return exits.success({
                    data: formList
                });
            } else {
                error.push(await sails.helpers.utility.getAppError("general.invalid_parameters"));

                return exits.jsonError(error);
            }
        } catch (err) {
            sails.log.debug("list-response.js (Line: 51) : e"); //debug
            sails.log.debug(err); //debug

            error.push(await sails.helpers.utility.getAppError("record.list_error"));

            return exits.jsonError(error);
        }
    }
};