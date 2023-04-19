const dotenv = require('dotenv')
dotenv.config()
module.exports = {
    isGuestMode: true,
    dbURL: process.env.MY_MONGO_URL,
    dbName: process.env.MY_MONGO_NAME,
    port: process.env.PORT,
}
