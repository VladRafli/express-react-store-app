import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import prisma from '../../../framework/database/prisma'
import AuthFacade from '../../utility/facade/AuthFacade'
import ErrorCode from '../../utility/enum/ErrorCode'
import ErrorMessage from '../../utility/enum/ErrorMessage'
import loginBodySchema from '../../validation/auth/loginBodySchema'

export default async function loginController(req: Request, res: Response) {
    const { username, password } = req.body

    if (loginBodySchema.validate(req.body).error === undefined) {
        let errorObject = new Error(loginBodySchema.validate(req.body).error?.message)
        res.status(StatusCodes.BAD_REQUEST).json({
            code: ErrorCode.MissingBodyProperty,
            message: ErrorMessage.MissingBodyProperty,
            description: errorObject.message,
            stack: errorObject.stack
        })
        return
    }

    let user = await prisma.user.findFirst({
        where: {
            username: username,
        },
    })

    if (user === null) {
        let errorObject = new Error(process.env.NODE_ENV === 'development' ? 'Username not found.' : ErrorMessage.BadCredentials)
        res.status(StatusCodes.UNAUTHORIZED).json({
            code: ErrorCode.BadCredentials,
            message: ErrorMessage.BadCredentials,
            description: errorObject.message,
            stack: errorObject.stack
        })
        return
    }

    if (!bcrypt.compareSync(password, user.password)) {
        let errorObject = new Error(process.env.NODE_ENV === 'development' ? 'Wrong password.' : ErrorMessage.BadCredentials)
        res.status(StatusCodes.UNAUTHORIZED).json({
            code: ErrorCode.BadCredentials,
            message: ErrorMessage.BadCredentials,
            description: errorObject.message,
            stack: errorObject.stack
        })
        return
    }

    let token = await AuthFacade.login({
        id: user.id,
        ip: req.header('Host') ?? '',
        userAgent: req.header('User-Agent') ?? ''
    })

    res.status(StatusCodes.OK).json({
        message: 'Successfully logged in!',
        total: null,
        data: token
    })
}
