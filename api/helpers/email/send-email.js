module.exports = {
    friendlyName: "Send Email From admin@uomoracleclub.com",
    description: "Send Email From admin@uomoracleclub.com",
    inputs: {
        to: {
            type: "ref",
            required: true
        },
        subject: {
            type: "string",
            required: true
        },
        content: {
            type: "string",
            required: true
        }
    },

    fn: async function(inputs, exits) {

        var nodemailer = require('nodemailer'),
            transporterUser = sails.config.mail.user,
            transporterUserName = sails.config.mail.name,
            transporterAuthPass = sails.config.mail.pass,
            info = {},
            transporter = null,
            msg = {};

        transporter = nodemailer.createTransport({
            host: 'mail.uomoracleclub.com',
            port: 587,
            auth: {
                user: transporterUser,
                pass: transporterAuthPass
            }
        })

        msg = {
            from: {
                address: transporterUser,
                name: transporterUserName
            },
            to: inputs.to,
            subject: inputs.subject,
            html: inputs.content
        };

        info = await transporter.sendMail(msg);

        await sails.helpers.customLog.createCustomLog({
            title: "Send Email",
            description: "Send Email to " + inputs.to + "with response: " +JSON.stringify(info),
            // user_id: await sails.helpers.user.getIdFromToken(inputs.auth.user_token),
            severity: "log"
        })

        return exits.success(info);
    }
};