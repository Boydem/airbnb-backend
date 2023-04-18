const logger = require('../service/logger.service')
const asyncLocalStorage = require('../service/als.service')

function requireAuth(req, res, next) {
    const { loggedinUser } = asyncLocalStorage.getStore()
    if (!loggedinUser) {
        req.loggedinUser = { _id: '', fullname: 'Guest' }
        return next()
    }
    if (!loggedinUser) return res.status(401).send('Not Authenticated')
    next()
}

function requireAdmin(req, res, next) {
    const { loggedinUser } = asyncLocalStorage.getStore()
    if (!loggedinUser) return res.status(401).send('Not Authenticated')
    if (!loggedinUser.isAdmin) {
        logger.warn(loggedinUser.fullname + 'attempted to perform admin action')
        res.status(403).end('Not Authorized')
        return
    }
    next()
}

module.exports = {
    requireAuth,
    requireAdmin,
}
