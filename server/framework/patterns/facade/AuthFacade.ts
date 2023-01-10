import dayjs from 'dayjs'
import { nanoid } from 'nanoid'
import prisma from '../../database/prisma/prisma'
import AuthModel from '../../../app/model/AuthModel'
import prismaErrorCatcher from '../../database/prisma/prismaErrorCatcher'

export default class AuthFacade {
    private static _auth: AuthModel

    /**
     * Return current authenticated user details
     */
    public static user(): AuthModel {
        return this._auth
    }

    /**
     * Create or update Login Session into database.
     * Returns newly issued token
     *
     * ```typescript
     * AuthFacade.login({
     *      id: 1 // User Id,
     *      ip: '192.168.1.10' // Requestee IP
     *      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36' // Requestee User Agent
     * }) // Returns string
     * ```
     */
    public static async login(
        data: { id: number; ip: string; userAgent: string },
        token?: string | null
    ): Promise<string | Error> {
        let newToken = null
        let user = null
        let session = null

        try {
            user = await prisma.user.findUnique({
                where: {
                    id: data.id,
                },
            })
        } catch (err) {
            const prismaError = prismaErrorCatcher(err)
            if (prismaError !== undefined) return prismaError
        }

        if (token !== null) {
            try {
                session = await prisma.session.findUnique({
                    where: {
                        token: token,
                    },
                    include: {
                        user: true,
                    },
                })
            } catch (err) {
                const prismaError = prismaErrorCatcher(err)
                if (prismaError !== undefined) return prismaError
            }

            if (session === null) {
                newToken = await this._generateToken()

                try {
                    await prisma.session.create({
                        data: {
                            userId: data.id,
                            token: newToken,
                            expireDate: dayjs().add(7, 'day').toDate(),
                            ip: data.ip,
                            userAgent: data.userAgent,
                        },
                    })
                } catch (err) {
                    const prismaError = prismaErrorCatcher(err)
                    if (prismaError !== undefined) return prismaError
                }

                this._populateAuth({
                    id: data.id,
                    username: user !== null ? user.username : '',
                    token: newToken,
                    ip: data.ip,
                    userAgent: data.userAgent,
                })
                return newToken
            }

            if (dayjs(session?.expireDate).diff(dayjs(), 'day') <= 7) {
                newToken = await this._generateToken()

                try {
                    await prisma.session.update({
                        data: {
                            token: newToken,
                        },
                        where: {
                            token: token,
                        },
                    })
                } catch (err) {
                    const prismaError = prismaErrorCatcher(err)
                    if (prismaError !== undefined) return prismaError
                }

                this._populateAuth({
                    id: session.id,
                    username: session.user.username,
                    ip: session.ip,
                    token: newToken,
                    userAgent: session.userAgent,
                })
                return newToken
            }
        }

        newToken = await this._generateToken()

        try {
            await prisma.session.create({
                data: {
                    userId: data.id,
                    token: newToken,
                    expireDate: dayjs().add(7, 'day').toDate(),
                    ip: data.ip,
                    userAgent: data.userAgent,
                },
            })
        } catch (err) {
            const prismaError = prismaErrorCatcher(err)
            if (prismaError !== undefined) return prismaError
        }

        this._populateAuth({
            id: data.id,
            username: user !== null ? user.username : '',
            ip: data.ip,
            token: newToken,
            userAgent: data.userAgent,
        })
        return newToken
    }

    /**
     * Authenticate user session.
     * 
     * ```typescript
     * AuthFacade.authenticate('<token>', { ip: req.ip, userAgent: req.header('User-Agent') })
     * ```
     */
    public static async authenticate(
        token: string,
        userMetadata: { ip?: string; userAgent?: string }
    ): Promise<boolean | Error> {
        let session = null

        if (userMetadata.ip === undefined) return false
        if (userMetadata.userAgent === undefined) return false

        try {
            session = await prisma.session.findFirst({
                where: {
                    token: token,
                    ip: userMetadata.ip,
                    userAgent: userMetadata.userAgent,
                    expireDate: {
                        lte: dayjs().toDate(),
                    },
                },
                include: {
                    user: true
                }
            })
        } catch (err) {
            const prismaError = prismaErrorCatcher(err)
            if (prismaError !== undefined) return prismaError
        }

        if (session !== null) {
            this._auth = {
                id: session.userId,
                ip: session.ip,
                token: session.token,
                userAgent: session.userAgent,
                username: session.user.username
            }
            return true
        }
        return false
    }

    private static async _generateToken(): Promise<string> {
        return new Promise((resolve) => {
            let token = nanoid()

            while (this._isTokenCollide(token)) {
                token = nanoid()
                this._isTokenCollide(token)
            }

            resolve(token)
        })
    }

    private static async _isTokenCollide(token: string): Promise<boolean> {
        return await new Promise((resolve) => {
            let check = null
            try {
                check = prisma.session.findUnique({
                    where: {
                        token,
                    },
                })
            } catch (err) {
                const prismaError = prismaErrorCatcher(err)
                if (prismaError !== undefined) resolve(false)
            }

            if (check !== null) resolve(true)
            resolve(false)
        })
    }

    private static _populateAuth(data: AuthModel): void {
        this._auth = data
    }
}
