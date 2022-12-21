import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../../../framework/database/prisma";
import prismaErrorCatcher from "../../../framework/database/prismaErrorCatcher";
import EnvironmentPhase from "../../../framework/patterns/enum/EnvironmentPhase";
import DevResponseFacade from "../../../framework/patterns/facade/DevResponseFacade";
import ResponseFacade from "../../../framework/patterns/facade/ResponseFacade";

export default async function getProductByIdController(req: Request, res: Response) {
    const productId = parseInt(req.params.id)

    let dataProductTotal = null
    let dataProduct = null

    try {
        dataProductTotal = await prisma.product.count()
    } catch (err) {
        prismaErrorCatcher(err, res)
    }

    try {
        dataProduct = await prisma.product.findMany({
            where: {
                id: productId
            }
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