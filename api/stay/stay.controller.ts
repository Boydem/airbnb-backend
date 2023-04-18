import { Request, Response } from 'express'

const stayService = require('./stay.service.ts')
const logger = require('../../service/logger.service')

async function getFilters(req: Request, res: Response) {
    try {
        logger.debug('Getting Filters')
        const filters = await stayService.getFilters()
        res.json(filters)
    } catch (err) {
        logger.error('Failed to get filters', err)
        res.status(500).send({ err: 'Failed to get stays' })
    }
}

async function getStays(req: Request, res: Response) {
    try {
        logger.debug('Getting Stays')
        console.log('req.query:', req.query)
        const { pageIdx, filterBy, searchBy } = req.query
        const stays = await stayService.query(filterBy, searchBy, pageIdx)
        res.json(stays)
    } catch (err) {
        logger.error('Failed to get stays', err)
        res.status(500).send({ err: 'Failed to get stays' })
    }
}
async function getStayById(req: Request, res: Response) {
    try {
        logger.debug('Getting Stays')
        console.log('req.params:', req.params)
        const { id } = req.params
        const stay = await stayService.get(id)
        res.json(stay)
    } catch (err) {
        logger.error('Failed to get stays', err)
        res.status(500).send({ err: 'Failed to get stays' })
    }
}

module.exports = {
    getStays,
    getStayById,
    getFilters,
}
// async function update(req: Request, res: Response) {
// const collection = await dbService.getCollection('stay')
// find all documents in the collection
// const documents = await collection.find({}).toArray()

// loop through each document and update it
// for (const document of documents) {
//     await collection.updateOne(
//         { _id: document._id },
//         {
//             $set: {
//                 avgRates: calcAvgRates(document.reviews),
//             },
//         }
//     )
// }
// for (const document of documents) {
//     await collection.updateOne(
//         { _id: document._id },
//         {
//             $set: {
//                 labels: [
//                     getRandomItemFromArr(gFiltersName),
//                     getRandomItemFromArr(gFiltersName),
//                     getRandomItemFromArr(gFiltersName),
//                     getRandomItemFromArr(gFiltersName),
//                     getRandomItemFromArr(gFiltersName),
//                     getRandomItemFromArr(gFiltersName),
//                     getRandomItemFromArr(gFiltersName),
//                     getRandomItemFromArr(gFiltersName),
//                 ],
//                 region: getRandomItemFromArr(gRegionsName),
//             },
//         }
//     )
// }
// res.send('ok')
// }
