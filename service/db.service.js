const MongoClient = require('mongodb').MongoClient

const logger = require('./logger.service')

module.exports = {
    getCollection,
}

var dbConn = null

async function getCollection(collectionName) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        logger.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(process.env.MY_MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        const db = client.db(process.env.MY_MONGO_NAME)
        dbConn = db
        return db
    } catch (err) {
        logger.error('Cannot Connect to DB', err)
        throw err
    }
}
