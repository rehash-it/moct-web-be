
const Joi = require('joi');
const mongoose = require('mongoose');
const siteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 255
    },

    description: {
        type: String,
        required: true,
        minlength: 10
    },
    images: [{ type: String, required: true }],
    region: {
        type: String,
        required: true
    },
    lat: Number,
    lng: Number,

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Site = mongoose.model('Site', siteSchema);

function validateSite(Site) {
    const schema = Joi.object({
        title: Joi.string().max(255).required(),
        description: Joi.string().min(10).required(),
        region: Joi.string().max(15),
        lat: Joi.number().allow(''),
        lng: Joi.number().allow(''),
        images: Joi.allow()
        // image : Joi.required(),
    });
    const validation = schema.validate(Site);
    return validation;
}


exports.Site = Site;
exports.validateSite = validateSite;