module.exports = {
    friendlyName: "Adds a Custom log record",
    description: "Adds a Custom log record",
    inputs: {
        title: {
            type: "string",
            required: true
        },
        description: {
            type: "string",
            required: false
        },
        user_id: {
            type: "string",
            required: false
        },
        severity: {
            type: "string",
            required: false
        },
    },

    fn: async function (inputs, exits) {
        var recordsAdded = await CustomLog.create(inputs).fetch()

        return exits.success(recordsAdded);
    }
};