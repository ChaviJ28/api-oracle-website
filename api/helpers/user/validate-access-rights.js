module.exports = {
    friendlyName: "Check if User is Active and has rights",
    description: "Check if User is Active and has rights",
    inputs: {
        user_id: {
            type: "string",
            required: true
        },
        access: {
            type: "string",
            required: true
        },
    },

    fn: async function (inputs, exits) {
        var valid = false;

        userList = await User.find({
            id: inputs.user_id
        });

        if (userList[0]) {
            if (userList[0].active == User.constants.active.yes) {
                if (userList[0].access.includes(inputs.access)) {
                    valid = true;
                }
            }
        }

        return exits.success(valid);
    }
};