
const Joi = require('joi');
const mongoose = require('mongoose');


const vacancySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },

    instruction: {
        type: String,
        required: true,
        minlength: 10
    },

    skills: {
        type: String,
        required: true
    },
    quantity: { //requires quantity
        type: Number,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Vacancy = mongoose.model('Vacancy', vacancySchema);

function validateVacancy(vacancy) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        instruction: Joi.string().min(10).required(),
        endDate: Joi.date(),
        // image : Joi.required(),
    });
    const validation = schema.validate(vacancy);
    return validation;
}


exports.Vacancy = Vacancy;
exports.validateVacancy = validateVacancy;