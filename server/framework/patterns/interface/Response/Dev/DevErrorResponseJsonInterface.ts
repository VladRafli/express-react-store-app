import ErrorCode from '../../../enum/ErrorCode'
import ErrorMessage from '../../../enum/ErrorMessage'

export default interface DevErrorResponseJsonInterface {
    code: ErrorCode
    message: ErrorMessage
    description: string
    stack?: string
}
