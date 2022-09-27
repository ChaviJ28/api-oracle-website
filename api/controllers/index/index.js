module.exports = {
    friendlyName: "Test",
    description: "Test",
    inputs: {
        data: {
            type: {},
            example: {}
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

        try {

            return exits.success({
                data: {
                    Hi: "how are you"
                }
            });

        } catch (err) {
            sails.log.debug(err);
            return exits.jsonError([err]);
        }
    }
}