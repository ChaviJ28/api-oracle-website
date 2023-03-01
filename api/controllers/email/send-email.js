module.exports = {
    friendlyName: "Send Email",
    description: "Send Email",
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
            var error = [],
                sendEmailresponse = null,
                content = "";

            content = "Testing Email Delivering System for New UoM Oracle Club Mail Server"

            sendEmailresponse = await sails.helpers.email.sendEmail(["chavi.surujbhali@umail.uom.ac.mu", "surujbhalichavi@gmail.com"], "UoM Oracle Club Name Testing", content);

            return exits.success({
                data: {
                    info: sendEmailresponse
                }
            });

        } catch (err) {
            sails.log.debug("send-email.js (Line: 42) : e");
            sails.log.debug(err);

            error.push(await sails.helpers.utility.getAppError("email.send_email_error"));
            return exits.jsonError(error);
        }
    }
}