export default class AuthModel {
    id?: number
    username?: string
    token?: string
    userAgent?: string
    ip?: string

    constructor(data: AuthModel) {
        this.id = data.id
        this.username = data.username
        this.token = data.token
        this.userAgent = data.userAgent
        this.ip = data.ip
    }
}
