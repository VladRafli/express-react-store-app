import appRoot from 'app-root-path'
import dayjs from 'dayjs'
import path from 'path'
import { createStream } from 'rotating-file-stream'

const rfsStream = createStream(`access-${dayjs().format('DD-MM-YYYY')}.log`, {
    interval: '1d', // rotate daily
    path: path.join(appRoot.path, 'log'),
})

export default rfsStream
