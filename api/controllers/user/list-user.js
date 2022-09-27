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
                if (inputs.data.search_criteria) {
                    searchCriteria = inputs.data.search_criteria;
                }

                userList = await User.find(searchCriteria);

                return exits.success({
                    data: userList
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