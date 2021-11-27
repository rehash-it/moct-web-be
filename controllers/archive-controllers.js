const axios = require('axios');
const { fb_Rss, twitter_Rss } = require('../constants');
const { Archives } = require('../models/archive');
const sendError = require('../utils/sendError');

const getFeeds = async (req, res) => {
    try {
        const feeds = await Archives.find()
        res.send(feeds)
    }
    catch (err) {
        console.log(err)
        sendError('internal server error', res)
    }
}
const saveFeed = async (req, res) => {
    try {
        let archieves = await Archives.find()
        const fb_fetch = await axios.get(fb_Rss);
        const twitter_fetch = await axios.get(twitter_Rss);
        let fb_data = fb_fetch.data.items
        let twitter_data = twitter_fetch.data.items
        let fb_rss_save = []
        let twitter_rss_save = []
        fb_data.forEach(r => {
            let rss = archieves.find(a => a.id === r.id && a.title === r.title && a.from === 'fb')
            if (!rss)
                fb_rss_save.push({ id: r.id, title: r.title, link: r.url, image: r.enclosure.url, from: 'fb', createdAt: r.date })
        })
        twitter_data.forEach(r => {
            let rss = archieves.find(a => a.id === r.id && a.title === r.title && a.from === 'twitter')
            if (!rss)
                twitter_rss_save.push({ id: r.id, title: r.title, link: r.url, image: r.enclosure.url, from: 'twitter', createdAt: r.date })
        })
        const save = await Archives.insertMany([...fb_rss_save, ...twitter_rss_save])
        res.send(save)
    }
    catch (err) {
        console.log(err)
        return sendError("internal server error", res, 500)
    }
}
module.exports = { saveFeed, getFeeds }