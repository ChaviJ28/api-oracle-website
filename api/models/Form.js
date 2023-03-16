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
            isIn: ["active", "draft", "closed"]
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
        description: {
            type: "string",
            required: false
        },
        banner: {
            type: "string",
            required: true,
        }
        // responses: {
        //     collection: "Response",
        //     via: "Form"
        // }
    },
    constants: {
        status: {
            active: "active",
            draft: "draft",
            closed: "closed"
        },
    }
};