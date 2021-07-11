const { now } = require("lodash");
const { Bid, validateBid } = require("../models/bids");
const APIFeatures = require("./../utils/APIFeatures");
var baseURL = require("../constants");
exports.getBids = async (req, res) => {
  //   const apiFeatures = new APIFeatures(News.find({"start_date": {"$gte": now(), "$lt": end_date}}), req.query)
  const apiFeatures = new APIFeatures(Bid.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const docCount = await Bid.find().countDocuments(); /* NOTE: THIS WORKS!! */
  const bid = await apiFeatures.query;
  if (!bid)
    return res.status(404).send("No bid(s) found with the provided data.");

  res.status(200).send([bid.reverse(), docCount]);
};

exports.createBid = async (req, res) => {
  const { error } = validateBid(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let bid = new Bid({
    title: req.body.title,
    instruction: req.body.instruction,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    file: baseURL.baseURL + "/uploads/" + req.file.filename,
  });
  bid = await bid.save();

  res.send(bid);
};

exports.updateBid = async (req, res) => {
  const { error } = validateBid(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const bid = await Bid.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      content: req.body.content,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      image: baseURL.baseURL + "/uploads/" + req.file.filename,
    },
    {
      new: true,
    }
  );

  if (!bid)
    return res.status(404).send("The Bid with the given ID was not found.");

  res.send(bid);
};

exports.deleteBid = async (req, res) => {
  const news = await Bid.findByIdAndRemove(req.params.id);

  if (!bid)
    return res.status(404).send("The Bid with the given ID was not found.");

  res.send(bid);
};

exports.getBidById = async (req, res) => {
  const bid = await Bid.findById(req.params.id);
  if (!bid)
    return res.status(404).send("The Bid with the given ID was not found.");
  res.send(bid);
};
