
const Joi = require('joi');
const mongoose = require('mongoose');


const vacancySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },

    description: {
        type: String,
        required: true,
        minlength: 10
    },

    skills: {
        type: String,
    },
    quantity: { //requires quantity
        type: Number,
        required: true
    },
    experience: {
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
        description: Joi.string().min(10).required(),
        quantity: Joi.number(),
        skills: Joi.allow(''),
        experience: Joi.number(),
        endDate: Joi.date(),
        createdAt: Joi.allow()
        // image : Joi.required(),
    });
    const validation = schema.validate(vacancy);
    return validation;
}


exports.Vacancy = Vacancy;
exports.validateVacancy = validateVacancy;