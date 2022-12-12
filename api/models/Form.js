/**
 * Form.js
 * 
 * Form
 */

module.exports = {
    attributes: {
        title: {
            type: "string",
            required: true,
        },
        form_fields: {
            type: "ref",
            required: true,
        },
        status: {
            type: "string",
            defaultsTo: "active",
            isIn: ["active", "unactive", "closed"]
        },
        created_by: {
            model: "User",
            required: true
        },
        end_date: {
            type: "string",
            required: false
        },
        custom_url: {
            type: "string",
            required: false
        },
        viewers: {
            type: "ref",
            required: true,
        },
        // responses: {
        //     collection: "Response",
        //     via: "Form"
        // }
    },
    constants: {
        status: {
            active: "active",
            unactive: "unactive"
        },
    }
};