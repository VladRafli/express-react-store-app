import winston from 'winston'
import appRoot from 'app-root-path'
import path from 'path'

const logger = winston.createLogger({
    levels: winston.config.npm.levels,
    transports: [
        new winston.transports.File({
            filename: path.join(appRoot.path, '/log/error.log'),
            level: 'error',
            format: winston.format.combine(
                winston.format.errors({ stack: true }),
                winston.format.timestamp(),
                winston.format.ms(),
                winston.format.json()
            ),
            maxsize: 5242880,
        }),
        new winston.transports.File({
            filename: path.join(appRoot.path, '/log/warning.log'),
            level: 'warn',
            format: winston.format.combine(
                winston.format.splat(),
                winston.format.timestamp(),
                winston.format.ms(),
                winston.format.json()
            ),
            maxsize: 5242880,
        }),
        new winston.transports.File({
            filename: path.join(appRoot.path, '/log/server.log'),
            level: 'info',
            format: winston.format.combine(
                winston.format.splat(),
                winston.format.timestamp(),
                winston.format.ms(),
                winston.format.json()
            ),
            maxsize: 5242880,
        }),
    ]
})

export default logger