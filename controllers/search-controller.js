const { News } = require('../models/news')
const { Bid } = require('../models/bids')
const { Docs } = require('../models/documents')
const { Site } = require('../models/sites')
const { Vacancy } = require('../models/vacancy')
const { matchString } = require('../utils/search')
const { removeDuplicates } = require('../utils/array')
const { checkDate } = require('../middleware/date')
const { Archives } = require('../models/archive')
const getPageData = (query, data) => {
    // api/search/index?p=1&limit=8
    const { p, limit: l } = query
    const page = p ? parseInt(p) : 0
    const limit = l ? parseInt(l) : data.length
    let datas = data.slice(((page * limit) - limit), (page * limit))
    return datas.reverse()
}
/** */
const search = async (req, res) => {
    const query = req.query
    const index = req.params.index
    const news = await News.find()
    const bids = await Bid.find()
    const documents = await Docs.find()
    const sites = await Site.find()
    const vacancy = await Vacancy.find()
    const archive = await Archives.find()
    /**news */
    const searchedArchives = Search(index, archive, ['title', 'from'])
    const searchedNews = Search(index, news, ['content', 'title'])
    let validNews = searchedNews.filter(n => {
        return checkDate(Date.now(), n.endDate)
    })
    /**bids */
    const searchedBids = Search(index, bids, ['instruction', 'title'])
    let validBids = searchedBids.filter(b => {
        return checkDate(Date.now(), b.endDate)
    })
    /**doucements */
    const searchedDoc = Search(index, documents, ['description', 'title'])
    /**sites */
    const searchedSites = Search(index, sites, ['description', 'title', 'region'])
    /**vacancy */
    const searchedVacancy = Search(index, vacancy, ['description', 'title', 'skills'])
    let result = {
        news: {
            data: getPageData(query, validNews),
            length: validNews.length
        },
        bids: {
            data: getPageData(query, validBids),
            length: validBids.length
        },
        vacancy: {
            data: getPageData(query, searchedVacancy),
            length: searchedVacancy.length
        },
        sites: {
            data: getPageData(query, searchedSites),
            length: searchedSites.length
        },
        vacancy: {
            data: getPageData(query, searchedVacancy),
            length: searchedVacancy.length
        },
        docs: {
            data: getPageData(query, searchedDoc),
            length: searchedDoc.length
        },
        archives: {
            data: getPageData(query, searchedArchives),
            length: searchedArchives.length
        }
    }
    res.send(result)
}

const Search = (index, datas, params) => {
    let newData = []
    datas.forEach(data => {
        for (var i in data) {
            params.forEach(p => {
                if (i === p) {
                    matchString(index, data[i]) ? newData.push(data) : () => { }
                }
            })
        }
    })
    return removeDuplicates(newData, '_id')
}
module.exports = { search }