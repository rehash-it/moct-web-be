const axios = require('axios');
const { Archives } = require('../models/archive');

const fbRssFeed = async () => {
    try {
        let archieves = await Archives.find()
        const fb_fetch = await axios.get(fb_rss);
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
                twitter_rss_save.push({ id: r.id, title: r.title, link: r.url, image: r.enclosure.url, from: 'fb', createdAt: r.date })
        })
        const save = await Archives.insert([...fb_rss_save, ...twitter_rss_save])
        return save
    }
    catch (err) {
        console.log(err)
        return false
    }
}

module.exports = { fbRssFeed, twitterFeed }