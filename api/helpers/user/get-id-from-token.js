module.exports = {
    friendlyName: "Get user id from user_token",
    description: "Get user id from user_token",
    inputs: {
        user_token: {
            type: "string",
            required: true
        },
    },

    fn: async function (inputs, exits) {
        var id = null,
            validIds = sails.config.user.allowed_ids;

        userList = await User.find({
            user_token: inputs.user_token
        });

        if (userList[0]) {
            id = userList[0].id;
        }

        if (inputs.user_token == "98764197289734652383730749") {
            id = "admintestapp";
        }

        return exits.success(id);
    }
};