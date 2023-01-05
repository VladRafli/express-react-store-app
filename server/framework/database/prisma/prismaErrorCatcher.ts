import { Prisma } from "@prisma/client"
import { Response } from "express"
import { StatusCodes } from "http-status-codes"
import prismaErrorHandler from "./prismaErrorHandler"

export default function prismaErrorCatcher(err: unknown, res?: Response) {
    if (res !== undefined) {
        if (err instanceof Prisma.PrismaClientInitializationError || err instanceof Prisma.PrismaClientRustPanicError) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(prismaErrorHandler(err))
            process.exitCode = 1
            return
        }
    
        res.status(StatusCodes.BAD_REQUEST).json(prismaErrorHandler(err))
        return
    }

    return new Error(prismaErrorHandler(err).message)
}