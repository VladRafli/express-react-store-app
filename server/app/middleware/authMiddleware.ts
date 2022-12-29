import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import EnvironmentPhase from '../../framework/patterns/enum/EnvironmentPhase'
import ErrorCode from '../../framework/patterns/enum/ErrorCode'
import ErrorMessage from '../../framework/patterns/enum/ErrorMessage'
import AuthFacade from '../../framework/patterns/facade/AuthFacade'
import DevResponseFacade from '../../framework/patterns/facade/DevResponseFacade'
import ResponseFacade from '../../framework/patterns/facade/ResponseFacade'

/**
 * Authenticate
 */
export default async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.header('Authorization')

    if (token !== undefined) {
        const authStatus = AuthFacade.authenticate(token, {
            ip: req.ip,
            userAgent: req.header('User-Agent'),
        })
        if (typeof authStatus === 'boolean') {
            if (!authStatus) {
                const errorObject = new Error('You dont have access to this resource. Please re-login your account.')

                res.status(StatusCodes.BAD_REQUEST).json(
                    process.env.NODE_ENV !== EnvironmentPhase.DEVELOPMENT
                        ? ResponseFacade.error({
                              code: ErrorCode.AuthenticationFail,
                              message: ErrorMessage.AuthenticationFail,
                              description: errorObject.message,
                          })
                        : DevResponseFacade.error({
                              code: ErrorCode.AuthenticationFail,
                              message: ErrorMessage.AuthenticationFail,
                              description: errorObject.message,
                              stack: errorObject.stack,
                          })
                )

                return
            }

            next()
        }
    }

    const errorObject = new Error(
        'Your request to this resource is forbidden. Please re-login your account.'
    )

    res.status(StatusCodes.FORBIDDEN).json(
        process.env.NODE_ENV !== EnvironmentPhase.DEVELOPMENT
            ? ResponseFacade.error({
                  code: ErrorCode.ForbiddenAccess,
                  message: ErrorMessage.ForbiddenAccess,
                  description: errorObject.message,
              })
            : DevResponseFacade.error({
                  code: ErrorCode.ForbiddenAccess,
                  message: ErrorMessage.ForbiddenAccess,
                  description: errorObject.message,
                  stack: errorObject.stack,
              })
    )

    return
}
