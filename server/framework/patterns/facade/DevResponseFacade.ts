import ErrorResponseJsonInterface from '../interface/Response/Dev/DevErrorResponseJsonInterface'
import SuccessResponseJsonInterface from '../interface/Response/Dev/DevSuccessResponseJsonInterface'

export default class DevResponseFacade {
    public static success(
        json: SuccessResponseJsonInterface
    ): SuccessResponseJsonInterface {
        return json
    }
    public static error(json: ErrorResponseJsonInterface): ErrorResponseJsonInterface {
        return json
    }
}
