module.exports = {
    friendlyName: "Lists all the possible access rights",
    description: "Lists all the possible access rights",
    inputs: {
        data: {
            type: {},
            example: {
                data: {
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
                rightsInitialArr = sails.config.user.access_rights,
                rightsArr = [];

            for (let i = 0; i < rightsInitialArr.length; i++) {
                var string = "";
                rightsInitialArr[i].split("_").forEach((char) => {
                    string += char.charAt(0).toUpperCase() + char.slice(1) + " ";
                });

                rightsArr.push({
                    text: string.slice(0, -1),
                    value: rightsInitialArr[i]
                })
            }

            return exits.success({
                data: rightsArr
            });
        } catch (err) {
            sails.log.debug("list-access-rights.js (Line: 37) : e"); //debug
            sails.log.debug(err); //debug

            error.push(await sails.helpers.utility.getAppError("record.list_error"));

            return exits.jsonError(error);
        }
    }
};