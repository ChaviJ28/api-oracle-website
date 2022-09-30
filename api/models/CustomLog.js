/**
 * CustomLog.js
 * 
 * CustomLog
 */

module.exports = {
    attributes: {
        title: {
            type: "string",
            required: false,
            maxLength: 1000
        },
        description: {
            type: "string",
            required: false,
            maxLength: 2000
        },
        user_id: {
            type: "string",
            required: false
        },
        severity: {
            type: "string",
            isIn: ["log", "warning", "error"],
            defaultsTo: "log"
        }
    },
    constants: {
        severity: {
            log: "log",
            warning: "warning",
            error: "error"
        }
    }
};