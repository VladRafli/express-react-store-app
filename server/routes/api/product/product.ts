import { Router } from 'express'
import getAllProductController from '../../../app/controller/product/getAllProductController'
import getProductByIdController from '../../../app/controller/product/getProductByIdController'

const router = Router()

router.get('/', getAllProductController)
router.get('/:id', getProductByIdController)

export default router