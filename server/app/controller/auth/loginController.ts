import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import prisma from '../../../framework/database/prisma/prisma'
import prismaErrorCatcher from '../../../framework/database/prisma/prismaErrorCatcher'
import EnvironmentPhase from '../../../framework/patterns/enum/EnvironmentPhase'
import ErrorCode from '../../../framework/patterns/enum/ErrorCode'
import ErrorMessage from '../../../framework/patterns/enum/ErrorMessage'
import AuthFacade from '../../../framework/patterns/facade/AuthFacade'
import DevResponseFacade from '../../../framework/patterns/facade/DevResponseFacade'
import ResponseFacade from '../../../framework/patterns/facade/ResponseFacade'
import loginBodySchema from '../../validation/auth/loginBodySchema'

export default async function loginController(req: Request, res: Response) {
    const { username, password } = req.body
    let user = null

    if (loginBodySchema.validate(req.body).error !== undefined) {
        const errorObject = new Error(
            loginBodySchema.validate(req.body).error?.message
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

    try {
        user = await prisma.user.findFirst({
            where: {
                username: username,
            },
        })
    } catch (err) {
        prismaErrorCatcher(err, res)
    }

    if (user === null) {
        const errorObject = new Error(
            process.env.NODE_ENV === EnvironmentPhase.DEVELOPMENT
                ? 'Username not found.'
                : ErrorMessage.BadCredentials
        )
        res.status(StatusCodes.UNAUTHORIZED).json(
            process.env.NODE_ENV !== EnvironmentPhase.DEVELOPMENT
                ? ResponseFacade.error({
                      code: ErrorCode.BadCredentials,
                      message: ErrorMessage.BadCredentials,
                      description: errorObject.message,
                  })
                : DevResponseFacade.error({
                      code: ErrorCode.BadCredentials,
                      message: ErrorMessage.BadCredentials,
                      description: errorObject.message,
                      stack: errorObject.stack,
                  })
        )
        return
    }

    if (!bcrypt.compareSync(password, user.password)) {
        const errorObject = new Error(
            process.env.NODE_ENV === EnvironmentPhase.DEVELOPMENT
                ? 'Wrong password.'
                : ErrorMessage.BadCredentials
        )
        res.status(StatusCodes.UNAUTHORIZED).json(
            process.env.NODE_ENV !== EnvironmentPhase.DEVELOPMENT
                ? ResponseFacade.error({
                      code: ErrorCode.BadCredentials,
                      message: ErrorMessage.BadCredentials,
                      description: errorObject.message,
                  })
                : DevResponseFacade.error({
                      code: ErrorCode.BadCredentials,
                      message: ErrorMessage.BadCredentials,
                      description: errorObject.message,
                      stack: errorObject.stack,
                  })
        )
        return
    }

    const token = await AuthFacade.login({
        id: user.id,
        ip: req.ip,
        userAgent: req.header('User-Agent') ?? '',
    })

    res.status(StatusCodes.OK).json(
        process.env.NODE_ENV !== EnvironmentPhase.DEVELOPMENT
            ? ResponseFacade.success({
                  message: 'Successfully logged in.',
                  total: null,
                  data: token,
              })
            : DevResponseFacade.success({
                  message: 'Successfully logged in.',
                  total: null,
                  data: token,
              })
    )
}
