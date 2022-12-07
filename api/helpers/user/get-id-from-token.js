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
        var id = null;

        userList = await User.find({
            user_token: inputs.user_token
        });

        if (userList[0]) {
            id = userList[0].id;
        }

        return exits.success(id);
    }
};