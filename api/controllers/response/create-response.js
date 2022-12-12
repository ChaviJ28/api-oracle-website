module.exports = {
    friendlyName: "Creates a new Response",
    description: "Creates a new Response",
    inputs: {
        data: {
            type: {},
            example: {
                ip: "130.21.25.31",
            }
        },
        auth: {
            type: {},
            example: {
                user_token: "",
                app_token: ""
            }
        }
    },
    exits: {
        jsonError: {
            responseType: "jsonError"
        },
        success: {
            responseType: "jsonOk"
        }
    },
    fn: async function (inputs, exits) {
        try {
            var error = [],
                insertParams = {},
                simpleValidator = require("@suyashsumaroo/simple-validator"),
                validationElements = [],
                formFieldArray = inputs.data.form_fields,
                formattedFormFields = [],
                randomstring = require("randomstring"),
                plainPassword = "",
                hashPassword = "",
                addedResponse = "";

            if (inputs.data) {
                validationElements = [{
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.ip,
                    name: "IP",
                    required: Response.attributes.ip.required
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.form,
                    name: "Form",
                    required: Response.attributes.form.required
                }];

                error = simpleValidator.validate(validationElements);

                if (error.length > 0) {
                    return exits.jsonError(error);
                } else {
                    for (let i = 0; i < formFieldArray.length; i++) {
                        insertParams = {
                            question: formFieldArray[i].question,
                            placeholder: formFieldArray[i].placeholder,
                            type: formFieldArray[i].type,
                            required: formFieldArray[i].required,
                        }
                        if (formFieldArray[i].type != FormField.constants.type.short_answer && formFieldArray[i].type != FormField.constants.type.long_answer) {
                            insertParams.options = formFieldArray[i].options
                        }
                        formattedFormFields.push(insertParams);
                    }

                    insertParams = {
                        ip: inputs.data.ip,
                        form: inputs.data.form,
                        form_fields: formattedFormFields,
                    };

                    addedResponse = await Response.create(insertParams).fetch();

                    // await sails.helpers.customLog.createCustomLog({
                    //     title: "Create Form",
                    //     description: "Form " + addedResponse.title + " created",
                    //     user_id: await sails.helpers.user.getIdFromToken(inputs.auth.user_token)
                    // })

                    return exits.success({
                        success_message: "Response Created Successfully",
                        data: {
                            response: addedResponse
                        }
                    });

                }
            }
        } catch (err) {
            sails.log.debug("create-response.js (Line: 98) : e"); //debug
            sails.log.debug(err); //debug

            error.push(await sails.helpers.utility.getAppError("record.create_error"));
            return exits.jsonError(error);
        }
    }
};