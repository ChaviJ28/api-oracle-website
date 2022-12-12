/**
 * Event.js
 * 
 * Event
 */

module.exports = {
    attributes: {
        title: {
            type: "string",
            required: true,
        },
        date: {
            type: "string",
            required: true,
        },
        description: {
            type: "string",
            required: true,
        },
        small_description: {
            type: "string",
            required: false,
        },
        image_url: {
            type: "string",
            required: true,
        },
        time_from: {
            type: "string",
            required: false,
        },
        time_to: {
            type: "string",
            required: false,
        },
        big_event: {
            type: "string",
            defaultsTo: "no",
            isIn: ["yes", "no"]
        },
        location: {
            type: "string",
            required: true,
        },
        form: {
            model: "Form",
            required: false
        },
        status: {
            type: "string",
            defaultsTo: "hidden",
            isIn: ["show", "hidden"]
        },
        custom_url: {
            type: "string",
            required: false
        },
        created_by: {
            model: "User",
            required: true
        }
    },
    constants: {
    }
};