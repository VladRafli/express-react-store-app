import prisma from '../framework/database/prisma/prisma'
import User from './seeder/User'
import Product from './seeder/Product'
import logger from '../framework/logging/winston'

async function main() {
    await prisma.$connect()

    await User()
    await Product()
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        logger.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
