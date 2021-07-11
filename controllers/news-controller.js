const { now } = require("lodash");
const { News, validateNews } = require("../models/news");
const APIFeatures = require("./../utils/APIFeatures");
var baseURL = require("../constants");
exports.getNews = async (req, res) => {
  //   const apiFeatures = new APIFeatures(News.find({"start_date": {"$gte": now(), "$lt": end_date}}), req.query)
  const apiFeatures = new APIFeatures(News.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const docCount = await News.find().countDocuments(); /* NOTE: THIS WORKS!! */
  const news = await apiFeatures.query;
  if (!news)
    return res.status(404).send("No news(s) found with the provided data.");

  res.status(200).send([news.reverse(), docCount]);
};

exports.createNews = async (req, res) => {
  const { error } = validateNews(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let news = new News({
    title: req.body.title,
    content: req.body.content,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    image: baseURL.baseURL + "/uploads/" + req.file.filename,
  });
  news = await news.save();

  res.send(news);
};

exports.updateNews = async (req, res) => {
  const { error } = validateNews(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const news = await News.findByIdAndUpdate(
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

  if (!news)
    return res.status(404).send("The News with the given ID was not found.");

  res.send(news);
};

exports.deleteNews = async (req, res) => {
  const news = await News.findByIdAndRemove(req.params.id);

  if (!news)
    return res.status(404).send("The News with the given ID was not found.");

  res.send(news);
};

exports.getNewsById = async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news)
    return res.status(404).send("The News with the given ID was not found.");
  res.send(news);
};
