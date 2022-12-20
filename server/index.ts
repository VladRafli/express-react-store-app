import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import morgan from 'morgan'

config()

const app = express()
const PORT = process.env.PORT !== undefined ? parseInt(process.env.PORT) : 5000

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
app.use(morgan('combined'))

app.use()

app.listen(PORT, () =>
    console.log(`Server is started on http://localhost:${PORT}`)
)
