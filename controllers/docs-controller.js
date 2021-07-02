const { now } = require("lodash");
const { Docs, validateDocs } = require("../models/documents");
const APIFeatures = require("./../utils/APIFeatures");
var baseURL = require("../constants");
exports.getDocs = async (req, res) => {
  const apiFeatures = new APIFeatures(Docs.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const docCount = await Docs.find().countDocuments(); /* NOTE: THIS WORKS!! */
  const docs = await apiFeatures.query;
  if (!docs)
    return res.status(404).send("No documents(s) found with the provided data.");

  res.status(200).send([docs, docCount]);
};

exports.createDocs = async (req, res) => {
  const { error } = validateDocs(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let docs = new Docs({
    title: req.body.title,
    file: baseURL.baseURL + "/uploads/" + req.file.filename,
  });
  docs = await docs.save();

  res.send(docs);
};

exports.updateDocs = async (req, res) => {
  const { error } = validateDocs(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const docs = await Docs.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      file: baseURL.baseURL + "/uploads/" + req.file.filename,
    },
    {
      new: true,
    }
  );

  if (!docs)
    return res.status(404).send("The Documents with the given ID was not found.");

  res.send(docs);
};

exports.deleteDocs = async (req, res) => {
  const docs = await Docs.findByIdAndRemove(req.params.id);

  if (!docs)
    return res.status(404).send("The Documents with the given ID was not found.");

  res.send(docs);
};

exports.getDocsById = async (req, res) => {
  const docs = await Docs.findById(req.params.id);
  if (!docs)
    return res.status(404).send("The Documents with the given ID was not found.");
  res.send(docs);
};
