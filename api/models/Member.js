/**
 * Member.js
 * 
 * Member
 */

module.exports = {
    attributes: {
        umail: {
            type: "string",
            required: true,
        },
        student_id: {
            type: "string",
            required: true,
        },
        first_name: {
            type: "string",
            required: true,
        },
        last_name: {
            type: "string",
            required: true,
        },
        phone_number: {
            type: "string",
            required: true,
        },
        faculty: {
            type: "string",
            required: true,
        },
        program_level: {
            type: "string",
            required: true,
        },
        course: {
            type: "string",
            required: true,
        },
        year: {
            type: "string",
            required: true,
        }
    },
    constants: {
    }
};