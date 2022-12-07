/**
 * FormField.js
 * 
 * FormField
 */

module.exports = {
    attributes: {
        question: {
            type: "ref",
            required: true,
        },
        placeholder: {
            type: "string",
            required: true,
        },
        type: {
            type: "string",
            defaultsTo: "short_answer",
            isIn: ["short_answer", "long_answer", "radio", "checkbox", "date"]
        },
        options: {
            type: "ref",
            required: false,
        },
        required: {
            type: "string",
            defaultsTo: "no",
            isIn: ["yes", "no"]
        },
        form: {
            model: "Form",
            required: false
        }
    },
    constants: {
        type: {
            short_answer: "short_answer",
            long_answer: "long_answer",
            radio: "radio",
            checkbox: "checkbox",
            date: "date",
        },
        required: {
            yes: "yes",
            no: "no"
        },
    }
};