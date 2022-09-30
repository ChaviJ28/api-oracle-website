module.exports = {
    friendlyName: "Validate Access Rights",
    description: "Validate Access Rights",
    inputs: {
        access: {
            type: "json",
            required: true
        },
    },

    fn: async function (inputs, exits) {
        var valid = true,
            accessRightsArray = sails.config.user.access_rights;

        for (let i = 0; i < inputs.access.length; i++) {
            const element = inputs.access[i];
            if (!accessRightsArray.includes(element)) {
                valid = false;
                break
            }
        }

        return exits.success(valid);
    }
};