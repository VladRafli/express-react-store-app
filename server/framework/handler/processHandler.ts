import dayjs from "dayjs"
import logger from "../logging/winston"
import EnvironmentPhase from "../patterns/enum/EnvironmentPhase"

export default function processHandler() {
    // https://nodejs.org/api/process.html#event-beforeexit
    process.on('beforeExit', (code) => {
        logger.info(`Server is shutting down with code: ${code}`)
    })
    // https://nodejs.org/api/process.html#event-exit
    process.on('exit', (code) => {
        logger.info(`Server is shutted down on ${dayjs().format('DD-MM-YYYY HH:mm:ss')} with code: ${code}`)
    })
    // https://nodejs.org/api/process.html#event-uncaughtexception
    process.on('uncaughtException', (err) => {
        logger.error(`${err.name}\n${err.message}\n${err.stack}`)
        process.exitCode = 1
    })
    // https://nodejs.org/api/process.html#event-unhandledrejection
    process.on('unhandledRejection', (reason) => {
        logger.warn(reason)
        if (process.env.NODE_ENV !== EnvironmentPhase.DEVELOPMENT) process.exitCode = 1
    })
}