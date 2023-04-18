import { IFilterBy } from '../../models/filter'
import { IReview } from '../../models/review'
import { ISearchBy } from '../../models/search'
import { IStay, IStayPreview } from '../../models/stay'
const { ObjectId } = require('mongodb')

const dbService = require('../../service/db.service')
const logger = require('../../service/logger.service')

interface filterOpts {
    labels?: { [key: string]: string[] }
}
interface searchOpts {
    region?: string
}

async function getFilters() {
    const collection = await dbService.getCollection('filter')
    const filters = await collection.find().toArray()
    return filters
}

async function get(stayId: string) {
    const collection = await dbService.getCollection('stay')
    const objectId = new ObjectId(stayId)
    const stay = await collection.findOne({ _id: objectId })
    console.log('found stay:', stay)
    return stay
}

async function query(
    filterBy = { labels: [] },
    searchBy = { destination: '' },
    pageIdx: number = 0,
    pageSize: number = 20
) {
    try {
        const collection = await dbService.getCollection('stay')
        const filter: filterOpts = {}
        const searchFilter: searchOpts = {}

        if (filterBy.labels.length > 0) {
            filter.labels = { $in: filterBy.labels }
        }

        if (searchBy.destination) {
            searchFilter.region = searchBy.destination
        }

        // Combine filter and searchFilter
        const queryFilter = { ...filter, ...searchFilter }

        // Count total number of pages
        const totalStays = await collection.countDocuments(queryFilter)
        const totalPages = Math.ceil(totalStays / pageSize)

        // Define the aggregation pipeline
        const pipeline = [{ $match: queryFilter }, { $skip: pageSize * pageIdx }, { $limit: pageSize }]

        // Execute the aggregation pipeline
        const stays = await collection.aggregate(pipeline).toArray()

        const staysForPreview: IStayPreview[] = stays.map((stay: IStay) => ({
            _id: stay._id,
            name: stay.name,
            price: stay.price,
            imgUrls: stay.imgUrls,
            isSuperHost: stay.host.isSuperHost,
            loc: stay.loc,
            avgRate: stay.avgRate,
            type: stay.type,
            labels: stay.labels,
            region: stay.region,
        }))

        console.log('found stays:', staysForPreview.length)
        return { stays: staysForPreview, totalPages }
    } catch (err) {
        console.log(err)
        logger.error('cannot find stays', err)
        throw err
    }
}

module.exports = {
    query,
    get,
    getFilters,
}
