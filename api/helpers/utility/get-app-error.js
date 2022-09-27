module.exports = {
    friendlyName: "Get the application error",
    description: "Get the application error",
    inputs: {
        errorName: {
            type: "string",
            example: "invalid_input",
            description: "The value should matched one of the errors defined in apperrors config file",
            required: true
        }
    },

    fn: async function(inputs, exits) {
        var errorDetails = sails.config.apperrors.general.unknown_error;
        var errorParts = [];

        try {
            if (inputs.errorName) {
                errorParts = inputs.errorName.split(".");

                if (errorParts.length > 0) {
                    errorDetails = sails.config.apperrors[errorParts[0]];

                    if (errorParts[1]) {
                        errorDetails = errorDetails[errorParts[1]]
                    }
                }
            }

            return exits.success(errorDetails);
        } catch (err) {
            console.log(err);
            errorDetails = sails.config.apperrors.general.unknown_error;
            
            return exits.success(errorDetails);
        }
    }
};