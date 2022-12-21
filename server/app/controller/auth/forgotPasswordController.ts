import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import EnvironmentPhase from '../../../framework/patterns/enum/EnvironmentPhase'
import ErrorCode from '../../../framework/patterns/enum/ErrorCode'
import ErrorMessage from '../../../framework/patterns/enum/ErrorMessage'
import DevResponseFacade from '../../../framework/patterns/facade/DevResponseFacade'
import ResponseFacade from '../../../framework/patterns/facade/ResponseFacade'
import forgotPasswordBodySchema from '../../validation/auth/forgotPasswordBodySchema'

export default async function forgotPasswordController(
    req: Request,
    res: Response
) {
    const { email } = req.body

    if (forgotPasswordBodySchema.validate(req.body).error !== undefined) {
        const errorObject = new Error(
            forgotPasswordBodySchema.validate(req.body).error?.message
        )
        res.status(StatusCodes.BAD_REQUEST).json(
            process.env.NODE_ENV !== EnvironmentPhase.DEVELOPMENT
                ? ResponseFacade.error({
                      code: ErrorCode.ValidationError,
                      message: ErrorMessage.ValidationError,
                      description: errorObject.message,
                  })
                : DevResponseFacade.error({
                      code: ErrorCode.ValidationError,
                      message: ErrorMessage.ValidationError,
                      description: errorObject.message,
                      stack: errorObject.stack,
                  })
        )
        return
    }

    res.status(StatusCodes.NOT_IMPLEMENTED).json(
        process.env.NODE_ENV !== EnvironmentPhase.DEVELOPMENT
            ? ResponseFacade.success({
                  message:
                      'This feature currently not available due to non-existence of SMTP Server for sending email.',
                  total: null,
                  data: null,
              })
            : DevResponseFacade.success({
                  message:
                      'This feature currently not available due to non-existence of SMTP Server for sending email.',
                  total: null,
                  data: null,
              })
    )
}
