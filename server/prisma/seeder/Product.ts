import { Prisma, Product } from '@prisma/client'
import prisma from '../../framework/database/prisma/prisma'
import { faker } from '@faker-js/faker'

export default async function Product() {
    const data: Prisma.Enumerable<Prisma.ProductCreateManyInput> = []

    for (let i = 0; i < 10; i++) {
        data.push({
            name: faker.commerce.productName(),
            image: faker.image.imageUrl(),
            description: faker.commerce.productDescription(),
            price: parseInt(faker.commerce.price(), 10),
        })
    }

    await prisma.product.createMany({
        data,
    })
}
