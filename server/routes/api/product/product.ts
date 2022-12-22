import { Router } from 'express'
import getAllProductController from '../../../app/controller/product/getAllProductController'
import getProductByIdController from '../../../app/controller/product/getProductByIdController'

const router = Router()

router.get('/product', getAllProductController)
router.get('/product/:id', getProductByIdController)

export default router