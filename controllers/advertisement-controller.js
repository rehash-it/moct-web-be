const { Advertisement, validateAdvertisement } = require('../models/advertisement');
const { Sponsor, validateSponsor } = require('../models/sponsor');

exports.getAdvertisement = async (req, res) => {
    const advertisement = await Advertisement.find().populate('sponsor').sort('createdAt');
    res.send(advertisement);
};

exports.createAdvertisement = async (req, res) => {
    const { error } = validateAdvertisement(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let advertisement = new Advertisement({
        title: req.body.title,
        sponsor: req.body.sponsor,
        bannerPhotoUrl: req.body.bannerPhotoUrl,
        paidAmount: req.body.paidAmount,
        from: req.body.from,
        to: req.body.to,
        status: req.body.status,
        description: req.body.description,
    });
    advertisement = await advertisement.save();
    res.send(advertisement);
};

exports.updateAdvertisement = async (req, res) => {
    const { error } = validateAdvertisement(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const advertisement = await Advertisement.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        spClass: req.body.spClass,
        address: req.body.address,
        phone: req.body.phone,
        from: req.body.from,
        to: req.body.to,
        status: req.body.status,
        description: req.body.description,
    }, {
        new: true
    });

    if (!advertisement) return res.status(404).send('The Advertisement with the given ID was not found.');

    res.send(advertisement);
};


exports.deleteAdvertisement = async (req, res) => {
    const advertisement = await Advertisement.findByIdAndRemove(req.params.id);

    if (!advertisement) return res.status(404).send('The Advertisement with the given ID was not found.');

    res.send(advertisement);
};
exports.getAdvertisementById = async (req, res) => {
    const advertisement = await Advertisement.findById(req.params.id);

    if (!advertisement) return res.status(404).send('The Advertisement with the given ID was not found.');

    res.send(advertisement);
};
