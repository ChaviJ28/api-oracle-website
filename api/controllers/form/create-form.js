module.exports = {
    friendlyName: "Creates a new Form",
    description: "Creates a new Form",
    inputs: {
        data: {
            type: {},
            example: {
                title: "First UoM Oracle Form",
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
                    value: inputs.data.title,
                    name: "Title",
                    required: Form.attributes.title.required
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.status,
                    name: "Status",
                    required: Form.attributes.status.required
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.end_date,
                    name: "End Date",
                    required: Form.attributes.end_date.required
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.custom_url,
                    name: "Custom Url",
                    required: Form.attributes.custom_url.required
                }];

                error = simpleValidator.validate(validationElements);

                if (error.length > 0) {
                    return exits.jsonError(error);
                } else {
                    validRights = await sails.helpers.user.validateAccessRights(inputs.auth.user_token, "create_form")
                    if (!validRights) {
                        error.push(await sails.helpers.utility.getAppError("user.no_access"));

                        return exits.jsonError(error);
                    } else {
                        for (let i = 0; i < formFieldArray.length; i++) {
                            insertParams = {
                                question: formFieldArray[i].question,
                                placeholder: formFieldArray[i].placeholder,
                                type: formFieldArray[i].type,
                                required: formFieldArray[i].required,
                            }
                            if (formFieldArray[i].type != Form.constants.type.short_answer && formFieldArray[i].type != Form.constants.type.long_answer) {
                                insertParams.options = formFieldArray[i].options
                            }
                            formattedFormFields.push(insertParams);
                        }

                        insertParams = {
                            title: inputs.data.title,
                            status: inputs.data.status,
                            created_by: sails.helpers.user.getIdFromToken(inputs.auth.user_token),
                            end_date: inputs.data.end_date,
                            custom_url: inputs.data.custom_url,
                            viewers: inputs.data.viewers,
                            form_fields: formattedFormFields,
                        };

                        addedResponse = await Form.create(insertParams).fetch();

                        await sails.helpers.customLog.createCustomLog({
                            title: "Create Form",
                            description: "Form " + addedResponse.title + " created",
                            user_id: await sails.helpers.user.getIdFromToken(inputs.auth.user_token)
                        })

                        return exits.success({
                            success_message: "Form Created Successfully",
                            data: {
                                user: addedResponse
                            }
                        });
                    }
                }
            }
        } catch (err) {
            sails.log.debug("create-form.js (Line: 98) : e"); //debug
            sails.log.debug(err); //debug

            error.push(await sails.helpers.utility.getAppError("record.create_error"));
            return exits.jsonError(error);
        }
    }
};