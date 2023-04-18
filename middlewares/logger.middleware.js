const logger = require('../service/logger.service')

async function log(req, res, next) {
    next()
}

module.exports = {
    log,
}
