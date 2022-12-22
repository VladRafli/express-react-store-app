import appRoot from 'app-root-path'
import path from 'path'
import { createStream } from 'rotating-file-stream'

const rfsStream = createStream(`${appRoot.path}/log/access.log`, {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log'),
})

export default rfsStream
