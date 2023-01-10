import cors from 'cors'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import { config } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import DbConnectionChecker from './framework/database/DbConnectionChecker'
import processHandler from './framework/handler/processHandler'
import httpLogger from './framework/logging/morgan'
import logger from './framework/logging/winston'
import apiRoute from './routes/api'

dayjs.extend(duration)
dayjs.extend(relativeTime)

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
app.use(helmet())

app.get('/', async (req, res) => {
    res.json({
        server: {
            status: 'running',
            message: 'Server is up and running!',
            data: {
                serverTime: new Date().toUTCString(),
                resourceUsage: process.resourceUsage(),
                uptime: dayjs.duration(Math.floor(process.uptime()), 'seconds').humanize(),
                nodeVersion: process.version,
            }
        },
        database: [
            {
                status: await DbConnectionChecker.RDBMSPing() ? 'running' : 'not_active',
                engine: 'mysql',
            }
        ]
    })
})

app.use(apiRoute)

const server = app.listen(PORT, () => {
    console.log(`Server is started on http://localhost:${PORT}`)
    logger.info(`Server is started on http://localhost:${PORT}`)
})

processHandler(server)
