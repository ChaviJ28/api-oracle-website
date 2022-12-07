/**
 * Form.js
 * 
 * Form
 */

module.exports = {
    attributes: {
        ip: {
            type: "string",
            required: false,
        },
        form_fields: {
            type: "ref",
            required: true,
        },
        form: {
            model: "Form",
            required: true
        }
    },
    constants: {}
};