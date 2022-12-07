module.exports = {
    friendlyName: "Creates a new Event",
    description: "Creates a new Event",
    inputs: {
        data: {
            type: {},
            example: {
                title: "UoM Oracle Event 1",
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
                    required: Event.attributes.title.required
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.status,
                    name: "Status",
                    required: Event.attributes.status.required
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.date,
                    name: "Date",
                    required: Event.attributes.date.required
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.custom_url,
                    name: "Custom Url",
                    required: Event.attributes.custom_url.required
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.description,
                    name: "Description",
                    required: Event.attributes.description.required
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.small_description,
                    name: "Small Description",
                    required: Event.attributes.small_description.required
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.image_url,
                    name: "Image Url",
                    required: Event.attributes.image_url.required
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.time_from,
                    name: "Time From",
                    required: Event.attributes.time_from.required
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.time_to,
                    name: "Time To",
                    required: Event.attributes.date.required
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.big_event,
                    name: "Big Event",
                    required: Event.attributes.big_event.required
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.location,
                    name: "location",
                    required: Event.attributes.location.required
                }, {
                    type: simpleValidator.constants.type.string,
                    value: inputs.data.form,
                    name: "Form",
                    required: Event.attributes.form.required
                }];

                error = simpleValidator.validate(validationElements);

                if (error.length > 0) {
                    return exits.jsonError(error);
                } else {
                    validRights = await sails.helpers.user.validateAccessRights(inputs.auth.user_token, "create_event")
                    if (!validRights) {
                        error.push(await sails.helpers.utility.getAppError("user.no_access"));

                        return exits.jsonError(error);
                    } else {
                        insertParams = {
                            title: inputs.data.title,
                            status: inputs.data.status,
                            date: inputs.data.date,
                            custom_url: inputs.data.custom_url,
                            image_url: inputs.data.image_url,
                            time_from: inputs.data.time_from,
                            time_to: inputs.data.time_to,
                            big_event: inputs.data.big_event,
                            location: inputs.data.location,
                            form: inputs.data.form,
                            created_by: sails.helpers.user.getIdFromToken(inputs.auth.user_token),
                        };

                        addedResponse = await Event.create(insertParams).fetch();

                        await sails.helpers.customLog.createCustomLog({
                            title: "Create Event",
                            description: "Event " + addedResponse.title + " created",
                            user_id: sails.helpers.user.getIdFromToken(inputs.auth.user_token)
                        })

                        return exits.success({
                            success_message: "Event Created Successfully",
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