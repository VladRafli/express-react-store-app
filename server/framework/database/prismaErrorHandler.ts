import { Prisma } from '@prisma/client'
import EnvironmentPhase from '../patterns/enum/EnvironmentPhase'
import ErrorCode from '../patterns/enum/ErrorCode'
import ErrorMessage from '../patterns/enum/ErrorMessage'
import DevResponseFacade from '../patterns/facade/DevResponseFacade'
import ResponseFacade from '../patterns/facade/ResponseFacade'
import DevErrorResponseJsonInterface from '../patterns/interface/Response/Dev/DevErrorResponseJsonInterface'
import ErrorResponseJsonInterface from '../patterns/interface/Response/Production/ErrorResponseJsonInterface'

export default function prismaErrorHandler(
    err: unknown
): DevErrorResponseJsonInterface | ErrorResponseJsonInterface {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const errorObject = new Error(
            `${err.code} - ${err.name} - ${err.message} - Client version: ${err.clientVersion}`
        )

        return process.env.NODE_ENV !== EnvironmentPhase.DEVELOPMENT
            ? ResponseFacade.error({
                  code: ErrorCode.PrismaClientKnownRequestError,
                  message: ErrorMessage.PrismaClientKnownRequestError,
                  description: errorObject.message,
              })
            : DevResponseFacade.error({
                  code: ErrorCode.PrismaClientKnownRequestError,
                  message: ErrorMessage.PrismaClientKnownRequestError,
                  description: errorObject.message,
                  stack: err?.stack ?? errorObject.stack,
              })
    }

    if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        const errorObject = new Error(
            `${err.name} - ${err.message} - Client version: ${err.clientVersion}`
        )

        return process.env.NODE_ENV !== EnvironmentPhase.DEVELOPMENT
            ? ResponseFacade.error({
                  code: ErrorCode.PrismaClientUnknownRequestError,
                  message: ErrorMessage.PrismaClientUnknownRequestError,
                  description: errorObject.message,
              })
            : DevResponseFacade.error({
                  code: ErrorCode.PrismaClientUnknownRequestError,
                  message: ErrorMessage.PrismaClientUnknownRequestError,
                  description: errorObject.message,
                  stack: err?.stack ?? errorObject.stack,
              })
    }

    if (err instanceof Prisma.PrismaClientRustPanicError) {
        const errorObject = new Error(
            `${err.name} - ${err.message} - Client version: ${err.clientVersion}`
        )

        return process.env.NODE_ENV !== EnvironmentPhase.DEVELOPMENT
            ? ResponseFacade.error({
                  code: ErrorCode.PrismaClientRustPanicError,
                  message: ErrorMessage.PrismaClientRustPanicError,
                  description: errorObject.message,
              })
            : DevResponseFacade.error({
                  code: ErrorCode.PrismaClientRustPanicError,
                  message: ErrorMessage.PrismaClientRustPanicError,
                  description: errorObject.message,
                  stack: err?.stack ?? errorObject.stack,
              })
    }

    if (err instanceof Prisma.PrismaClientInitializationError) {
        const errorObject = new Error(
            `${err.errorCode + ' -' ?? ''} ${err.message} - Client version: ${err.clientVersion}`
        )

        return process.env.NODE_ENV !== EnvironmentPhase.DEVELOPMENT
            ? ResponseFacade.error({
                  code: ErrorCode.PrismaClientInitializationError,
                  message: ErrorMessage.PrismaClientInitializationError,
                  description: errorObject.message,
              })
            : DevResponseFacade.error({
                  code: ErrorCode.PrismaClientInitializationError,
                  message: ErrorMessage.PrismaClientInitializationError,
                  description: errorObject.message,
                  stack: err?.stack ?? errorObject.stack,
              })
    }

    if (err instanceof Prisma.PrismaClientValidationError) {
        const errorObject = new Error(
            `${err.name} - ${err.message}`
        )

        return process.env.NODE_ENV !== EnvironmentPhase.DEVELOPMENT
            ? ResponseFacade.error({
                  code: ErrorCode.PrismaClientValidationError,
                  message: ErrorMessage.PrismaClientValidationError,
                  description: errorObject.message,
              })
            : DevResponseFacade.error({
                  code: ErrorCode.PrismaClientValidationError,
                  message: ErrorMessage.PrismaClientValidationError,
                  description: errorObject.message,
                  stack: err?.stack ?? errorObject.stack,
              })
    }

    const errorObject = new Error('Unknown error.')

    return process.env.NODE_ENV !== EnvironmentPhase.DEVELOPMENT
        ? ResponseFacade.error({
              code: ErrorCode.UnknownError,
              message: ErrorMessage.UnknownError,
              description: errorObject.message,
          })
        : DevResponseFacade.error({
              code: ErrorCode.UnknownError,
              message: ErrorMessage.UnknownError,
              description: errorObject.message,
              stack: errorObject.stack,
          })
}
