import morgan from 'morgan'
import rfsStream from '../fs/rfs'

const httpLogger = morgan('combined', {
    stream: rfsStream
})

export default httpLogger
