import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import processHandler from './framework/handler/processHandler'
import httpLogger from './framework/logging/morgan'
import logger from './framework/logging/winston'
import apiRoute from './routes/api'

config()

const app = express()
const PORT = process.env.PORT !== undefined ? parseInt(process.env.PORT, 10) : 5000

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
)
app.use(httpLogger)

app.get('/', (req, res) => {
    res.json({
        status: 'running',
        message: 'Server is up and running!'
    })
})

app.use(apiRoute)

app.listen(PORT, () => {
    logger.info(`Server is started on http://localhost:${PORT}`)
    processHandler()
})
