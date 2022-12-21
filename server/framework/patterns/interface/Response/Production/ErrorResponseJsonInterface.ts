import ErrorCode from '../../../../../framework/patterns/enum/ErrorCode'
import ErrorMessage from '../../../../../framework/patterns/enum/ErrorMessage'

export default interface ErrorResponseJsonInterface {
    code: ErrorCode
    message: ErrorMessage
    description: string
}
