/**
 * User.js
 *
 * User 
 */

module.exports = {
    attributes: {
        email: {
            type: "string",
            required: true
        },
        full_name: {
            type: "string",
            required: false
        },
        username: {
            type: "string",
            required: false
        },
        password: {
            type: "string",
            required: false
        },
        administrator: {
            type: "string",
            defaultsTo: "no",
            isIn: ["yes", "no"]
        },
        access: {
            type: "json",
            required: false
        },
        active: {
            type: "string",
            defaultsTo: "yes",
            isIn: ["yes", "no"]
        }
    },
    constants: {
        administrator: {
            yes: "yes",
            no: "no"
        },
        active: {
            yes: "yes",
            no: "no"
        },
    }
};