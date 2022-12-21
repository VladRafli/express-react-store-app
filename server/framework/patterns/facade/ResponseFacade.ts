import ErrorResponseJsonInterface from '../interface/Response/Production/ErrorResponseJsonInterface'
import SuccessResponseJsonInterface from '../interface/Response/Production/SuccessResponseJsonInterface'

export default class ResponseFacade {
    public static success(
        json: SuccessResponseJsonInterface
    ): SuccessResponseJsonInterface {
        return json
    }
    public static error(json: ErrorResponseJsonInterface): ErrorResponseJsonInterface {
        return json
    }
}
