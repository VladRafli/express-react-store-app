import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import prisma from '../../../framework/database/prisma'
import prismaErrorCatcher from '../../../framework/database/prismaErrorCatcher'
import EnvironmentPhase from '../../../framework/patterns/enum/EnvironmentPhase'
import ErrorCode from '../../../framework/patterns/enum/ErrorCode'
import ErrorMessage from '../../../framework/patterns/enum/ErrorMessage'
import DevResponseFacade from '../../../framework/patterns/facade/DevResponseFacade'
import ResponseFacade from '../../../framework/patterns/facade/ResponseFacade'
import registerBodySchema from '../../validation/auth/registerBodySchema'

export default async function registerController(req: Request, res: Response) {
    const { username, newPassword, repeatPassword } = req.body

    if (registerBodySchema.validate(req.body).error !== undefined) {
        const errorObject = new Error(
            registerBodySchema.validate(req.body).error?.message
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

    if (newPassword !== repeatPassword) {
        const errorObject = new Error('Password are not identical.')
        res.status(StatusCodes.BAD_REQUEST).json(
            process.env.NODE_ENV !== EnvironmentPhase.DEVELOPMENT
                ? ResponseFacade.error({
                      code: ErrorCode.BadFormInput,
                      message: ErrorMessage.BadFormInput,
                      description: errorObject.message,
                  })
                : DevResponseFacade.error({
                      code: ErrorCode.BadFormInput,
                      message: ErrorMessage.BadFormInput,
                      description: errorObject.message,
                      stack: errorObject.stack,
                  })
        )
        return
    }

    try {
        await prisma.user.create({
            data: {
                username: username,
                password: newPassword,
            },
        })
    } catch (err) {
        prismaErrorCatcher(err, res)
    }
    

    res.status(StatusCodes.OK).json(
        process.env.NODE_ENV !== EnvironmentPhase.DEVELOPMENT
            ? ResponseFacade.success({
                  message: 'Successfully created new account.',
                  total: null,
                  data: null,
              })
            : DevResponseFacade.success({
                  message: 'Successfully created new account.',
                  total: null,
                  data: null,
              })
    )
}
