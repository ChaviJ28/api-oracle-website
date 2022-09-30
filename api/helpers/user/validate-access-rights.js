module.exports = {
    friendlyName: "Check if User is Active and has rights",
    description: "Check if User is Active and has rights",
    inputs: {
        user_id: {
            type: "string",
            required: true
        },
        access: {
            type: "json",
            required: true
        },
    },

    fn: async function (inputs, exits) {
        var valid = true;

        //check if user is active and has rights

        return exits.success(valid);
    }
};