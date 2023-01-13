module.exports = {
    friendlyName: "Adds a Custom log record",
    description: "Adds a Custom log record",
    inputs: {
        data: {
            type: "json",
            required: true
        }
    },
    fn: async function (inputs, exits) {
        var enabled = sails.config.appsettings.custom_logs.enabled,
            recordsAdded = []

        if (enabled) {
            recordsAdded = await CustomLog.create(inputs.data).fetch();
        }

        return exits.success(recordsAdded);
    }
};