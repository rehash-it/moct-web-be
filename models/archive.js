const Joi = require('joi');
const mongoose = require('mongoose');
const archiveSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    from: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Archives = mongoose.model('Archive', archiveSchema);

function validateArchives(archives) {
    const schema = Joi.object({
        id: Joi.string().required(),
        title: Joi.string().required(),
        link: Joi.string().required(),
        image: Joi.string(),
        createdAt: Joi.date(),
        // image : Joi.required(),
    });
    const validation = schema.validate(archives);
    return validation;
}


exports.Archives = Archives;
exports.validateArchives = validateArchives;