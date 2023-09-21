const Joi = require('joi')

//Event-defined function to validate the user
function validateEvent(event) {
    const JoiSchema = Joi.object({

        title: Joi.string()
            .required(),

        description: Joi.string()
            .email()
            .min(5)
            .max(50)
            .required(),

        location: Joi.string()
            .required(),

        start_at: Joi.date()
            .required(),

        end_at: Joi.date()
            .required(),
    }).options({ abortEarly: false });

    return JoiSchema.validate(event)
}

module.exports = validateEvent;
