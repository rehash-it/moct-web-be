const { now } = require("lodash");
const { News, validateNews } = require("../models/news");
const APIFeatures = require("../utils/APIFeatures");
var baseURL = require("../constants");
const { checkDate } = require("../middleware/date");
exports.getNews = async (req, res) => {
  const { admin } = req.headers;
  const filter = !admin ? {endDate: {"$gte": Date.now()}}: {};
  //   const apiFeatures = new APIFeatures(News.find({"start_date": {"$gte": now(), "$lt": end_date}}), req.query)
  const apiFeatures = new APIFeatures(News.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const docCount = await News.find(filter).countDocuments(); /* NOTE: THIS WORKS!! */
  const news = await apiFeatures.query;
  let validNews = news.filter(n => {
    return checkDate(Date.now(), n.endDate)
  }
  )
  validNews.reverse()
  news.reverse()
  if (!news)
    return res.status(404).send("No news(s) found with the provided data.");

  res.status(200).send([admin ? news.reverse() : validNews.reverse(), docCount]);
};

exports.createNews = async (req, res) => {
  const { error } = validateNews(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let news = new News({
    title: req.body.title,
    content: req.body.content,
    endDate: req.body.endDate,
    images: req.files ? req.files.length ? req.files.map(f => baseURL.baseURL + "/uploads/" + f.filename) : [] : [],
  });
  news = await news.save();

  res.send(news);
};

exports.updateNews = async (req, res) => {
  const { error } = validateNews(req.body);
  console.log(error)
  console.log(req.files)
  if (error) return res.status(400).send(error.details[0].message);
  const news = await News.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      content: req.body.content,
      endDate: req.body.endDate,
      images: req.files ? req.files.length ? req.files.map(f => baseURL.baseURL + "/uploads/" + (f.mimetype === 'image/jpeg' ? f.filename : f.originalname)) : [] : []
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
