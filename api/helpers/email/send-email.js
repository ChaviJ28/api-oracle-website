module.exports = {
    friendlyName: "Send Email From OCI Email Delivery System",
    description: "Send Email From OCI Email Delivery System",
    inputs: {
        to: {
            type: "string",
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

    fn: async function (inputs, exits) {

        var nodemailer = require('nodemailer'),
            info = {},
            transporter = null,
            msg = {};

        transporter = nodemailer.createTransport({
            host: 'smtp.email.af-johannesburg-1.oci.oraclecloud.com',
            port: 587,
            auth: {
                user: "ocid1.user.oc1..aaaaaaaawwllkeqqc53y2xeiqqq7fdn24ibl2zd74uzhda6pqm2ldgz6p7oa@ocid1.tenancy.oc1..aaaaaaaanmarmt7uvhnfyiuauqbhpqlutl3auj2oyhwa7fbvan2jggwg7pmq.5s.com",
                pass: "zbIR!Nu{5zUeoELWoNhj"
            }
        })

        msg = {
            from: {
                address: 'chavi.surujbhali@umail.uom.ac.mu',
                name: 'Uom Oracle Club Test'
            },
            to: inputs.to,
            subject: inputs.subject,
            html: inputs.content
        };

        info = await transporter.sendMail(msg);

        await sails.helpers.customLog.createCustomLog({
            title: "Send Email",
            description: "send email to " + inputs.to,
            user_id: await sails.helpers.user.getIdFromToken(inputs.auth.user_token),
            severity: "log"
        })

        return exits.success({
            response: info
        });
    }
};