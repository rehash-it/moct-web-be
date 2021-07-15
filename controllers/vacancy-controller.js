const { now } = require("lodash");
const { Vacancy, validateVacancy } = require("../models/vacancy");
const APIFeatures = require("../utils/APIFeatures");
var baseURL = require("../constants");
exports.getVacancy = async (req, res) => {
    //   const apiFeatures = new APIFeatures(News.find({"start_date": {"$gte": now(), "$lt": end_date}}), req.query)
    const apiFeatures = new APIFeatures(Vacancy.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const docCount = await Vacancy.find().countDocuments(); /* NOTE: THIS WORKS!! */
    const vacancy = await apiFeatures.query;
    vacancy.reverse()
    if (!vacancy)
        return res.status(404).send("No vacancy(s) found with the provided data.");

    res.status(200).send([vacancy.reverse(), docCount]);
};

exports.createVacancy = async (req, res) => {
    const { error } = validateVacancy(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    let vacancy = new Vacancy({
        title: req.body.title,
        description: req.body.description,
        skills: req.body.skills,
        quantity: req.body.quantity,
        endDate: req.body.endDate,
        experience: req.body.experience
    });
    vacancy = await vacancy.save();

    res.send(vacancy);
};

exports.updateVacancy = async (req, res) => {
    const { error } = validateVacancy(req.body);

    console.log(error)
    if (error) return res.status(400).send(error.details[0].message);

    const vacancy = await Vacancy.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            description: req.body.description,
            skills: req.body.skills,
            quantity: req.body.quantity,
            endDate: req.body.endDate,
        },
        {
            new: true,
        }
    );

    if (!vacancy)
        return res.status(404).send("The vancancy with the given ID was not found.");
    res.send(vacancy);
};

exports.deleteVacancy = async (req, res) => {
    const vacancy = await Vacancy.findByIdAndRemove(req.params.id);
    if (!vacancy)
        return res.status(404).send("The Bid with the given ID was not found.");

    res.send(vacancy);
};

exports.getVacancyById = async (req, res) => {
    const vacancy = await Vacancy.findById(req.params.id);
    if (!vacancy)
        return res.status(404).send("The Bid with the given ID was not found.");
    res.send(vacancy);
};
