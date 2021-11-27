const { now } = require("lodash");
const { validateSite, Site } = require("../models/sites");
const APIFeatures = require("../utils/APIFeatures");
var baseURL = require("../constants");
const deleteFile = require("../middleware/deleteFile");
exports.getSites = async (req, res) => {
    //   const apiFeatures = new APIFeatures(News.find({"start_date": {"$gte": now(), "$lt": end_date}}), req.query)
    const apiFeatures = new APIFeatures(Site.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const sitesCount = await Site.find().countDocuments(); /* NOTE: THIS WORKS!! */
    const sites = await apiFeatures.query;
    sites.reverse()
    if (!sites)
        return res.status(404).send("No site(s) found with the provided data.");

    res.status(200).send([sites.reverse(), sitesCount]);
};

exports.createSite = async (req, res) => {

    const { error } = validateSite(req.body);
    console.log(error)
    if (error) return res.status(400).send(error.details[0].message);
    let sites = new Site({
        title: req.body.title,
        description: req.body.description,
        region: req.body.region,
        lat: req.body.lat,
        lng: req.body.lng,
        images: req.files.map(f => baseURL.baseURL + "/uploads/" + f.filename),
    });
    sites = await sites.save();

    res.send(sites);
};

exports.updateSite = async (req, res) => {
    const { error } = validateSite(req.body);
    console.log(error)
    if (error) return res.status(400).send(error.details[0].message);
    const site = await Site.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            description: req.body.description,
            region: req.body.region,
            lat: req.body.lat,
            lng: req.body.lng,
            images: req.files.map(f => baseURL.baseURL + "/uploads/" + (f.mimetype === 'image/jpeg' ? f.filename : f.originalname)),
        },
        {
            new: true,
        }
    );

    if (!site)
        return res.status(404).send("The Site with the given ID was not found.");

    res.send(site);
};

exports.deleteSite = async (req, res) => {
    const find = await Site.find({ _id: req.params.id })
    find[0].images.forEach(d => deleteFile(d))
    const site = await Site.findByIdAndRemove(req.params.id);

    if (!site)
        return res.status(404).send("The site with the given ID was not found.");

    res.send(site);
};

exports.getSiteById = async (req, res) => {
    const site = await Site.findById(req.params.id);
    if (!site)
        return res.status(404).send("The site with the given ID was not found.");
    res.send(site);
};
