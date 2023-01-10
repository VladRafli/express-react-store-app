import { Router } from 'express'
import authRouter from './api/auth/auth'
import productRouter from './api/product/product'

const router = Router({ mergeParams: true })

router.use('/auth', authRouter)
router.use('/product', productRouter)

export default router