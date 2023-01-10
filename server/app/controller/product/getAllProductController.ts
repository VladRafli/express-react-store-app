import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import prisma from '../../../framework/database/prisma/prisma'
import prismaErrorCatcher from '../../../framework/database/prisma/prismaErrorCatcher'
import EnvironmentPhase from '../../../framework/patterns/enum/EnvironmentPhase'
import ErrorCode from '../../../framework/patterns/enum/ErrorCode'
import ErrorMessage from '../../../framework/patterns/enum/ErrorMessage'
import DevResponseFacade from '../../../framework/patterns/facade/DevResponseFacade'
import ResponseFacade from '../../../framework/patterns/facade/ResponseFacade'
import getAllProductSchema from '../../validation/product/getAllProductSchema'

export default async function getAllProductController(
    req: Request,
    res: Response
) {
    const skip = typeof req.query.skip === 'string' ? parseInt(req.query.skip) : undefined
    const take = typeof req.query.take === 'string' ? parseInt(req.query.take) : undefined

    let dataProductTotal = null
    let dataProduct = null

    if (getAllProductSchema.validate({ skip, take }).error !== undefined) {
        const errorObject = new Error(
            getAllProductSchema.validate(req.body).error?.message
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
        dataProductTotal = await prisma.product.count()
    } catch (err) {
        prismaErrorCatcher(err, res)
    }

    try {
        dataProduct = await prisma.product.findMany({
            skip: skip,
            take: take
        })
    } catch (err) {
        prismaErrorCatcher(err, res)
    } 

    res.status(StatusCodes.OK).json(
        process.env.NODE_ENV !== EnvironmentPhase.DEVELOPMENT
            ? ResponseFacade.success({
                  message: 'Successfully fetch data.',
                  total: dataProductTotal,
                  data: dataProduct,
              })
            : DevResponseFacade.success({
                  message: 'Successfully fetch data.',
                  total: dataProductTotal,
                  data: dataProduct,
              })
    )
}
