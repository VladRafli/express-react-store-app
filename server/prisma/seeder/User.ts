import prisma from '../../framework/database/prisma/prisma'
import bcrypt from 'bcrypt'

export default async function User() {
    await prisma.user.createMany({
        data: [
            {
                username: 'admin',
                password: bcrypt.hashSync('123', bcrypt.genSaltSync()),
            },
        ],
    })
}
