import { Router } from 'express'
import forgotPasswordController from '../../../app/controller/auth/forgotPasswordController'
import loginController from '../../../app/controller/auth/loginController'
import registerController from '../../../app/controller/auth/registerController'

const router = Router()

router.post('/login', loginController)
router.post('/register', registerController)
router.post('/forgot', forgotPasswordController)

export default router