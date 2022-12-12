module.exports = {
    friendlyName: "Update Event",
    description: "Update Event",
    inputs: {
        data: {
            type: {},
            example: {
                search_criteria: {
                    id: "123456789"
                },
                update_params: {
                    title: "another title"
                }
            }
        },
        auth: {
            type: {},
            example: {
                app_token: "",
                user_token: ""
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
            formattedFormFields = [],
            isEmptyObject = require("is-empty-object");

        try {
            if (inputs.data && inputs.data.search_criteria && inputs.data.update_params && !isEmptyObject(inputs.data.search_criteria)) {
                validRights = await sails.helpers.user.validateAccessRights(inputs.auth.user_token, "create_event")
                if (!validRights) {
                    error.push(await sails.helpers.utility.getAppError("user.no_access"));

                    return exits.jsonError(error);
                } else {

                    updateResponse = await Event.update(inputs.data.search_criteria, inputs.data.update_params).fetch();

                    await sails.helpers.customLog.createCustomLog({
                        title: "Update Event",
                        description: "From " + JSON.stringify(inputs.data.search_criteria) + " updated with params : " + JSON.stringify(inputs.data.update_params),
                        user_id: await sails.helpers.user.getIdFromToken(inputs.auth.user_token)
                    })

                    return exits.success({
                        success_message: "Event updated successfully"
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