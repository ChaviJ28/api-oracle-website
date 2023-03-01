module.exports = {
    friendlyName: "Check if new Custom url is valid",
    description: "Check if new Custom url is valid",
    inputs: {
        custom_url: {
            type: "string",
            required: true
        },
    },

    fn: async function (inputs, exits) {
        var valid = true,
            validIds = sails.config.user.allowed_ids;

        formList = await Form.find({
            custom_url: inputs.custom_url
        });

        if (formList[0]) {
            valid = false;
        }

        return exits.success(valid);
    }
};