import prisma from './prisma/prisma'

export default class DbConnectionChecker {
    public static async RDBMSPing(): Promise<boolean> {
        return prisma.$executeRaw`SELECT 1 = 1`.then(() => true).catch(() => false)
    }
}
