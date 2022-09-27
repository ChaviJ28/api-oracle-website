module.exports = {
    friendlyName: "Calculates the commission based on a purchase and allocates the rewards and transfers the amount of BUNs purchased to the buyer",
    description: "Calculates the commission based on a purchase and allocates the rewards and transfers the amount of BUNs purchased to the buyer",
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

        return exits.success({
            response: info
        });
    }
};