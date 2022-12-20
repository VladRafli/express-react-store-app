import dayjs from 'dayjs'
import { nanoid } from 'nanoid'
import prisma from '../../../framework/database/prisma'
import AuthModel from '../../model/AuthModel'
import LoginObject from '../interface/LoginObjectInterface'

export default class AuthFacade {
    private static _auth: AuthModel

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
        data: LoginObject,
        token?: string | null
    ): Promise<string> {
        let newToken = null
        let user = await prisma.user.findUnique({
            where: {
                id: data.id,
            },
        })

        if (token !== null) {
            let session = await prisma.session.findUnique({
                where: {
                    token: token,
                },
                include: {
                    user: true,
                },
            })

            if (session === null) {
                newToken = await this._generateToken()

                await prisma.session.create({
                    data: {
                        userId: data.id,
                        token: newToken,
                        ttl: dayjs().add(7, 'day').toDate(),
                        ip: data.ip,
                        userAgent: data.userAgent,
                    },
                })
                this._populateAuth({
                    id: data.id,
                    username: user !== null ? user.username : '',
                    token: newToken,
                    ip: data.ip,
                    userAgent: data.userAgent,
                })
                return newToken
            }

            if (dayjs().diff(session?.ttl, 'day') <= 7) {
                newToken = await this._generateToken()

                await prisma.session.update({
                    data: {
                        token: newToken,
                    },
                    where: {
                        token: token,
                    },
                })
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
        await prisma.session.create({
            data: {
                userId: data.id,
                token: newToken,
                ttl: dayjs().add(7, 'day').toDate(),
                ip: data.ip,
                userAgent: data.userAgent,
            },
        })
        this._populateAuth({
            id: data.id,
            username: user !== null ? user.username : '',
            ip: data.ip,
            token: newToken,
            userAgent: data.userAgent,
        })
        return newToken
    }

    private static async _generateToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            let token = nanoid()

            while (this._isTokenCollide(token)) {
                token = nanoid()
                this._isTokenCollide(token)
            }

            resolve(token)
        })
    }

    private static async _isTokenCollide(token: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            let check = await prisma.session.findUnique({
                where: {
                    token: token,
                },
            })

            if (check !== null) resolve(true)
            resolve(false)
        })
    }

    private static _populateAuth(data: AuthModel) {
        this._auth = data
    }
}
