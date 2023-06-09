const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()
const http = require('http').createServer(app)

// Express App Config
app.use(cookieParser())
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    // app.use(express.static(path.resolve(__dirname, 'public')))
    const corsOptions = {
        origin: ['https://airbnb-frontend-y5qm.onrender.com', 'https://airbnb-frontend-y5qm.onrender.com'],
        credentials: true,
    }
    app.use(cors(corsOptions))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true,
    }
    app.use(cors(corsOptions))
}
// Routes Imports
const stayRoutes = require('./api/stay/stay.routes.js')

// Routes Calls
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)

app.use('/api/stay', stayRoutes)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/stay/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const logger = require('./service/logger.service')
const { port } = require('./config/config.js')
http.listen(port || 3030, () => {
    logger.info('Server is running on port: ' + port)
})
